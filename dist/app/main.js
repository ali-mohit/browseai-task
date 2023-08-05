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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_ctrl = void 0;
const yargs_1 = __importDefault(require("yargs"));
const version_1 = require("./commands/version");
const hello_world_1 = require("./commands/hello_world");
const robot_list_1 = require("./commands/robot_list");
const robot_info_1 = require("./commands/robot_info");
const robot_run_1 = require("./commands/robot_run");
const cmd_config_1 = require("./app_configuration/cmd_config");
function test_ctrl(name) {
    console.log("Hello,", name);
    return 0;
}
exports.test_ctrl = test_ctrl;
function run_app() {
    return __awaiter(this, void 0, void 0, function* () {
        let conf = (0, cmd_config_1.get_cmd_config)();
        let func_list = [
            new robot_list_1.RobotListCommand(conf),
            new robot_info_1.RobotInfoCommand(conf),
            new robot_run_1.RobotRunCommand(conf),
            new version_1.VersionCommand(),
            new hello_world_1.HelloWorldCommand(),
        ];
        for (var cls_obj of func_list) {
            cls_obj.create_command();
        }
        yargs_1.default.argv;
        return 0;
    });
}
if (typeof require !== "undefined" && require.main === module) {
    const p = run_app();
}
//# sourceMappingURL=main.js.map