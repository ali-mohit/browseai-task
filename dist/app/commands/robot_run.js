"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotRunCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
const robot_services_1 = require("../core/robot_services");
const exception_1 = require("../core/exception");
const input_params_util_1 = require("../libs/input_params_util");
class RobotRunCommand extends base_cli_command_1.BaseCliCommand {
    constructor(app_config) {
        super("robot_run", "run a task for specific robot by api key and robot id");
        this.app_config = app_config;
    }
    get_option_list() {
        return {
            api_key: new command_option_1.CommandOption('api_key', 'a', 'password', 'BrowseAI API KEY', true, ""),
            robot_id: new command_option_1.CommandOption('id', 'i', 'string', 'ROBOT ID', true, "", false),
            default_parameters: new command_option_1.CommandOption('default', 'd', 'string', 'Making a new job by default parameters', true, "yes", false, ["yes", "no", "y", "n", "true", "false", "t", "f"]),
            parameters: new command_option_1.CommandOption('parameters_json_file_address', 'p', 'string', 'address of task parameters as a json file (exmpale: ./temp.js)', false, "", false),
        };
    }
    process_command(argv) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Starting to run a task");
            let using_default_parameters = true;
            const robot = yield this.find_robot(String(argv.api_key), String(argv.robot_id));
            let use_default = (_b = (_a = String(argv.default_parameters)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
            if (use_default && (use_default == "yes" || use_default == "y" || use_default == "true"))
                using_default_parameters = true;
            else
                using_default_parameters = false;
            const result = yield (0, robot_services_1.robot_run_from_file)(this.app_config.base_url, String(argv.api_key), robot, String(argv.robot_id), using_default_parameters, String(argv.parameters));
            if (result[1]) {
                throw result[1];
            }
            console.table(result[0]);
        });
    }
    process_command_cli(_) {
        return __awaiter(this, void 0, void 0, function* () {
            let cli_result = yield this.run_cli(this.build_cli_inputs());
            if (cli_result[1])
                throw cli_result[1];
            else if (cli_result[0] == null) {
                throw 'cli returned NULL value.';
            }
            const robot_list = yield (0, robot_services_1.get_robot_list)(this.app_config.base_url, cli_result[0].api_key);
            if (robot_list[1])
                throw robot_list[1];
            let robot_choices = [];
            for (let index in robot_list[0]) {
                let robot_item = robot_list[0][index];
                robot_choices.push(robot_item.name + " |[" + robot_item.id + "]");
            }
            let cli_questions_step_02 = [];
            let expand = {
                type: "list",
                name: "id",
                message: "Select the robot that you want to make a job",
                choices: robot_choices,
            };
            cli_questions_step_02.push(expand);
            cli_questions_step_02.push({
                type: "confirm",
                name: "making_by_default",
                message: "Making a new job by default parameters",
            });
            let cli_result_step_02 = yield this.run_cli(cli_questions_step_02);
            if (cli_result_step_02[1])
                throw cli_result_step_02[1];
            else if (cli_result_step_02[0] == null) {
                throw 'cli returned NULL value. (step 02)';
            }
            let robot_id = cli_result_step_02[0].id.split('|')[1].replace("[", "").replace("]", "");
            const robot = yield this.find_robot(cli_result[0].api_key, robot_id);
            let parameters = {};
            if (!cli_result_step_02[0].making_by_default) {
                parameters = yield this.get_robot_parameters_by_cli(robot);
            }
            else {
                parameters = null;
            }
            const result = yield (0, robot_services_1.robot_run)(this.app_config.base_url, cli_result[0].api_key, robot, robot_id, cli_result_step_02[0].making_by_default, parameters, true);
            if (result[1]) {
                throw result[1];
            }
            console.table(result[0]);
        });
    }
    find_robot(api_key, robot_id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const pod_result = yield (0, robot_services_1.get_robot_detail)(this.app_config.base_url, api_key, robot_id);
            if (pod_result[1]) {
                let err_code = -1;
                err_code = (_b = (_a = pod_result[1].response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : -1;
                throw new exception_1.AppException(err_code, (_d = (_c = pod_result[1].response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : "", pod_result[1]);
            }
            if (!pod_result[0])
                throw new exception_1.AppException(-1, "robot id not found", null);
            return pod_result[0];
        });
    }
    get_robot_parameters_by_cli(robot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!robot.inputParameters || robot.inputParameters.length == 0) {
                return {};
            }
            let cli_questions = [];
            for (let param_index in robot.inputParameters) {
                let question = (0, input_params_util_1.build_cli_question_by_input_parameters)(robot.inputParameters[param_index]);
                cli_questions.push(question);
            }
            let cli_result = yield this.run_cli(cli_questions);
            if (cli_result[1])
                throw cli_result[1];
            else if (cli_result[0] == null) {
                throw 'cli returned NULL value. (get_parameters_by_cli)';
            }
            return cli_result[0];
        });
    }
}
exports.RobotRunCommand = RobotRunCommand;
//# sourceMappingURL=robot_run.js.map