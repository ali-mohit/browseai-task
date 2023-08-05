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
exports.RobotInfoCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
const robot_services_1 = require("../core/robot_services");
const exception_1 = require("../core/exception");
class RobotInfoCommand extends base_cli_command_1.BaseCliCommand {
    constructor(app_config) {
        super("robot_info", "retrieve information of a robot by api key and robot id");
        this.app_config = app_config;
    }
    get_option_list() {
        return {
            api_key: new command_option_1.CommandOption('api_key', 'a', 'password', 'BrowseAI API KEY', true, ""),
            robot_id: new command_option_1.CommandOption('id', 'i', 'string', 'ROBOT ID', true, ""),
        };
    }
    process_command(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Starting to Get a Robot information");
            yield this.main_process(String(argv.api_key), String(argv.robot_id));
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
            yield this.main_process(cli_result[0].api_key, cli_result[0].id);
        });
    }
    main_process(api_key, robot_id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, robot_services_1.get_robot_detail)(this.app_config.base_url, api_key, robot_id);
            if (result[1]) {
                let err_code = -1;
                err_code = (_b = (_a = result[1].response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : -1;
                throw new exception_1.AppException(err_code, (_d = (_c = result[1].response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : "", result[1]);
            }
            if (result[0])
                (0, robot_services_1.print_robot_info)(result[0]);
            else
                console.log('robot id not found!');
        });
    }
}
exports.RobotInfoCommand = RobotInfoCommand;
//# sourceMappingURL=robot_info.js.map