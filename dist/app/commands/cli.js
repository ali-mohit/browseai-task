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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCommand = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const base_cli_command_1 = require("../libs/base_cli_command");
class CliCommand extends base_cli_command_1.BaseCliCommand {
    constructor(app_config, command_list) {
        super("cli", "interactive cli");
        this.app_config = app_config;
        this.command_list = command_list;
        this.command_description_list = {};
        this.command_dict = {};
        this.main_menu_command = [];
        this.clear_screen = "clear screen";
        this.help_screen = "help";
        this.command_description_list = {};
        this.command_dict = {};
        for (let i in this.command_list) {
            let command = this.command_list[i];
            if (command.name == "cli")
                continue;
            let command_code = command.description + " (" + command.name + ")";
            this.command_description_list[command.name] = command.description;
            this.command_dict[command_code] = command;
            this.main_menu_command.push(command_code);
        }
        this.main_menu_command.push(this.help_screen);
        this.main_menu_command.push(this.clear_screen);
        this.main_menu_command.push('exit');
    }
    get_option_list() {
        return {};
    }
    process_command(_) {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log("Starting interactive CLI");
            let is_finished = false;
            console.table(this.command_description_list);
            while (!is_finished) {
                try {
                    let answers = yield inquirer_1.default.prompt([
                        {
                            type: 'rawlist',
                            name: 'main_menu',
                            message: 'Please select your command index:',
                            pageSize: 10,
                            choices: this.main_menu_command
                        },
                    ]);
                    if (answers.main_menu == 'exit') {
                        is_finished = true;
                        console.log('Application Finished');
                    }
                    if (answers.main_menu == this.clear_screen) {
                        console.clear();
                    }
                    if (answers.main_menu == this.help_screen) {
                        console.table(this.command_description_list);
                    }
                    console.log('-----------------------------------------');
                    console.log(`running -> ${answers.main_menu}:`);
                    let selected_command = this.command_dict[answers.main_menu];
                    if (selected_command)
                        yield selected_command.process_command_cli({});
                    console.log('-----------------------------------------');
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
}
exports.CliCommand = CliCommand;
//# sourceMappingURL=cli.js.map