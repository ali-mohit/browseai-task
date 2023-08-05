"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandOption = exports.convert_command_option_to_cli_option = void 0;
function convert_command_option_to_cli_option(ctype) {
    if (ctype == "string")
        return "input";
    if (ctype == "number")
        return "number";
    if (ctype == "password")
        return "password";
    if (ctype == "array")
        return "rawlist";
    if (ctype == "boolean")
        return "confirm";
    return "input";
}
exports.convert_command_option_to_cli_option = convert_command_option_to_cli_option;
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
        let yargs_type = this.type;
        if (yargs_type == "password")
            yargs_type = "string";
        let result = {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: yargs_type,
        };
        if (this.choices)
            result.choices = this.choices;
        if (this.defaultValue)
            result.default = this.defaultValue;
        return result;
    }
    get_inquirer_option() {
        if (this.type == "array") {
            let arrayResult = {
                type: 'rawlist',
                name: this.name,
                message: this.describe,
            };
            if (this.defaultValue)
                arrayResult.default = this.defaultValue;
            if (this.choices)
                arrayResult.choices = this.choices;
            return arrayResult;
        }
        let result = {
            type: convert_command_option_to_cli_option(this.type),
            name: this.name,
            message: this.describe,
        };
        if (this.defaultValue)
            result.default = this.defaultValue;
        return result;
    }
}
exports.CommandOption = CommandOption;
//# sourceMappingURL=command_option.js.map