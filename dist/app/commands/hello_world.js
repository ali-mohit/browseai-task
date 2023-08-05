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
exports.HelloWorldCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
class HelloWorldCommand extends base_cli_command_1.BaseCliCommand {
    constructor() {
        super("hello", "says hello to world");
    }
    get_option_list() {
        return {
            name: new command_option_1.CommandOption('name', 'n', 'string', 'Your Name', false, ""),
        };
    }
    process_command(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            if (argv.name) {
                console.log("Hello ", argv.name);
                return;
            }
            console.log("Hello, World");
        });
    }
    process_command_cli(_) {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            let result = yield this.run_cli(this.build_cli_inputs());
            if (result[1])
                throw result[1];
            else if (result[0] == null) {
                throw 'cli returned NULL value.';
            }
            if (result[0].name) {
                console.log("Hello ", result[0].name);
                return;
            }
            console.log("Hello, World");
        });
    }
}
exports.HelloWorldCommand = HelloWorldCommand;
//# sourceMappingURL=hello_world.js.map