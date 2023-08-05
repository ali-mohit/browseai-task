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
class RobotRunCommand extends base_cli_command_1.BaseCliCommand {
    constructor(app_config) {
        super("robot_run", "run a task for specific robot by api key and robot id");
        this.app_config = app_config;
    }
    get_option_list() {
        return {
            api_key: new command_option_1.CommandOption('api_key', 'a', 'string', 'BrowseAI API KEY', true, ""),
            robot_id: new command_option_1.CommandOption('id', 'i', 'string', 'ROBOT ID', true, ""),
            default_parameters: new command_option_1.CommandOption('default', 'd', 'string', 'Making a new job by default parameters', true, "yes", true, ["yes", "no", "y", "n", "true", "false", "t", "f"]),
            parameters: new command_option_1.CommandOption('parameters_json_file_address', 'p', 'string', 'address of task parameters as a json file (exmpale: ./temp.js)', false, "", false),
        };
    }
    process_command(argv) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Starting to run a task");
            let using_default_parameters = true;
            const pod_result = yield (0, robot_services_1.get_robot_detail)(this.app_config.base_url, String(argv.api_key), String(argv.robot_id));
            if (pod_result[1]) {
                let err_code = -1;
                err_code = (_b = (_a = pod_result[1].response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : -1;
                throw new exception_1.AppException(err_code, (_d = (_c = pod_result[1].response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : "", pod_result[1]);
            }
            if (!pod_result[0])
                throw new exception_1.AppException(-1, "robot id not found", null);
            let use_default = (_f = (_e = String(argv.default_parameters)) === null || _e === void 0 ? void 0 : _e.toLowerCase()) !== null && _f !== void 0 ? _f : "";
            if (use_default && (use_default == "yes" || use_default == "y" || use_default == "true"))
                using_default_parameters = true;
            else
                using_default_parameters = false;
            const result = yield (0, robot_services_1.robot_run)(this.app_config.base_url, String(argv.api_key), pod_result[0], String(argv.robot_id), using_default_parameters, String(argv.parameters));
            if (result[1]) {
                throw result[1];
            }
            console.table(result[0]);
        });
    }
}
exports.RobotRunCommand = RobotRunCommand;
//# sourceMappingURL=robot_run.js.map