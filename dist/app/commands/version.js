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
exports.VersionCommand = void 0;
const base_cli_command_1 = require("../libs/base_cli_command");
class VersionCommand extends base_cli_command_1.BaseCliCommand {
    constructor() {
        super("version", "returns version of applications");
        this.app_version = "Browse AI CLI v1.0.0";
    }
    get_option_list() {
        return {};
    }
    process_command(_) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.app_version);
        });
    }
    process_command_cli(_) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.app_version);
        });
    }
}
exports.VersionCommand = VersionCommand;
//# sourceMappingURL=version.js.map