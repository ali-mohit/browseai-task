"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
class HelloWorldCommand extends base_cli_command_1.BaseCliCommand {
    constructor() {
        super("hello", "says hello to world");
    }
    process_command(argv) {
        if (argv.name) {
            console.log("Hello ", argv.name);
            return;
        }
        console.log("Hello, World");
    }
    get_option_list() {
        return {
            name: new command_option_1.CommandOption('name', 'n', 'string', 'Your Name', false, ""),
        };
    }
}
exports.HelloWorldCommand = HelloWorldCommand;
//# sourceMappingURL=hello_world.js.map