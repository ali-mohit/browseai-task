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
exports.RobotListCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
const robot_services_1 = require("../core/robot_services");
const exception_1 = require("../core/exception");
class RobotListCommand extends base_cli_command_1.BaseCliCommand {
    constructor(app_config) {
        super("robot_list", "retrieve a list of your robots by api key");
        this.app_config = app_config;
    }
    get_option_list() {
        return {
            api_key: new command_option_1.CommandOption('api_key', 'a', 'string', 'BrowseAI API KEY', true, ""),
        };
    }
    process_command(argv) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Starting to Get Robot List");
            const result = yield (0, robot_services_1.get_robot_list)(this.app_config.base_url, String(argv.api_key));
            if (result[1]) {
                let err_code = -1;
                err_code = (_b = (_a = result[1].response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : -1;
                throw new exception_1.AppException(err_code, (_d = (_c = result[1].response) === null || _c === void 0 ? void 0 : _c.statusText) !== null && _d !== void 0 ? _d : "", result[1]);
            }
            (0, robot_services_1.print_robot_list)(result[0]);
        });
    }
}
exports.RobotListCommand = RobotListCommand;
//# sourceMappingURL=robot_list.js.map