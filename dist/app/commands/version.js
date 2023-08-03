"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version_command = void 0;
function version_command(arg_obj) {
    arg_obj.command("version", "returns version of applications", {}, (_) => {
        console.log("Browse AI CLI v1.0.0");
    });
}
exports.version_command = version_command;
//# sourceMappingURL=version.js.map