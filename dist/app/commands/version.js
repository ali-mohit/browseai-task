"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
class VersionCommand extends base_cli_command_1.BaseCliCommand {
    constructor() {
        super("version", "returns version of applications");
    }
    get_option_list() {
        return {};
    }
    process_command(_) {
        console.log("Browse AI CLI v1.0.0");
    }
}
exports.VersionCommand = VersionCommand;
//# sourceMappingURL=version.js.map