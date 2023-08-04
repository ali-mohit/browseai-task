"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandOption = void 0;
class CommandOption {
    constructor(name, alias, type = "string", describe = "", demandOption = false, defaultValue = "") {
        this.name = name;
        this.alias = alias;
        this.type = type;
        this.describe = describe;
        this.demandOption = demandOption;
        this.defaultValue = defaultValue;
    }
    get_yargs_option() {
        return {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: this.type,
        };
    }
}
exports.CommandOption = CommandOption;
//# sourceMappingURL=command_option.js.map