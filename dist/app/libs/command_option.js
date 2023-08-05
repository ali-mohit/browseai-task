"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandOption = void 0;
class CommandOption {
    constructor(name, alias, type = "string", describe = "", demandOption = false, defaultValue = "", showInActiveCli = true, choices = undefined) {
        this.name = name;
        this.alias = alias;
        this.type = type;
        this.describe = describe;
        this.demandOption = demandOption;
        this.defaultValue = defaultValue;
        this.showInActiveCli = showInActiveCli;
        this.choices = choices;
    }
    get_yargs_option() {
        let result = {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: this.type,
        };
        if (this.choices)
            result.choices = this.choices;
        if (this.defaultValue)
            result.default = this.defaultValue;
        return result;
    }
}
exports.CommandOption = CommandOption;
//# sourceMappingURL=command_option.js.map