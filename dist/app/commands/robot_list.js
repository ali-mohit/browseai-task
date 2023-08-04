"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotListCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
const command_option_1 = require("../libs/command_option");
class RobotListCommand extends base_cli_command_1.BaseCliCommand {
    constructor() {
        super("robot_list", "retrieve a list of your robots by api key");
    }
    get_option_list() {
        return {
            api_key: new command_option_1.CommandOption('api_key', 'a', 'string', 'BrowseAI API KEY', true, ""),
        };
    }
    process_command(argv) {
        get_robot_list(String(argv.api_key));
    }
}
exports.RobotListCommand = RobotListCommand;
function get_robot_list(api_key) {
    console.log('Hello, ', api_key);
}
//# sourceMappingURL=robot_list.js.map