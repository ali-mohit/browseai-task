"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCliCommand = void 0;
class BaseCliCommand {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    create_command(arg_obj) {
        let yargs_option_list = {};
        let cmd_option_list = this.get_option_list();
        for (let key in cmd_option_list) {
            let opt = cmd_option_list[key].get_yargs_option();
            yargs_option_list[key] = opt;
        }
        arg_obj.command(this.name, this.description, yargs_option_list, (argv) => {
            this.process_command(argv);
        });
    }
}
exports.BaseCliCommand = BaseCliCommand;
//# sourceMappingURL=base_cli_command.js.map