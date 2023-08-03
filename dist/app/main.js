"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_ctrl = void 0;
const yargs_1 = __importDefault(require("yargs"));
const version_1 = require("./commands/version");
const hello_world_1 = require("./commands/hello_world");
function test_ctrl(name) {
    console.log("Hello,", name);
    return 0;
}
exports.test_ctrl = test_ctrl;
function run_app() {
    (0, version_1.version_command)(yargs_1.default);
    (0, hello_world_1.hello_world_command)(yargs_1.default);
    yargs_1.default.help().argv;
    return 0;
}
if (typeof require !== "undefined" && require.main === module) {
    let return_code = run_app();
    process.exit(return_code);
}
//# sourceMappingURL=main.js.map