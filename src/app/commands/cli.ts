import {ArgumentsCamelCase} from 'yargs'
import inquirer from 'inquirer'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';
import { CmdConf } from '../app_configuration/cmd_config';


export class CliCommand extends BaseCliCommand {
    private command_description_list: {[key:string]: string} = {};
    private command_dict: {[key:string]: BaseCliCommand} = {};
    private main_menu_command: any[] = [];
    private clear_screen: string = "clear screen"
    private help_screen: string = "help"

    constructor(private app_config:CmdConf, private command_list: BaseCliCommand[]){
        super("cli", "interactive cli");

        this.command_description_list = {};
        this.command_dict = {};

        for(let i in this.command_list){
            let command = this.command_list[i];
            if(command.name == "cli")
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

    get_option_list(): { [key: string]: CommandOption; } {
        return {}
    }

    async process_command(_: ArgumentsCamelCase) {
        console.clear();
        console.log("Starting interactive CLI");
        let is_finished = false;
        console.table(this.command_description_list);
        while(!is_finished){
            try{
                let answers = await inquirer.prompt(
                    [
                        {
                            type: 'rawlist',
                            name: 'main_menu',
                            message: 'Please select your command index:',
                            pageSize: 10,
                            choices: this.main_menu_command
                        },
                    ]
                );

                if(answers.main_menu == 'exit'){
                    is_finished = true;
                    console.log('Application Finished');
                } 

                if(answers.main_menu == this.clear_screen){
                    console.clear();
                }

                if(answers.main_menu == this.help_screen){
                    console.table(this.command_description_list);
                }
                
                console.log('-----------------------------------------')
                console.log(`running -> ${answers.main_menu}:`)
                let selected_command = this.command_dict[answers.main_menu];
                if (selected_command)
                    await selected_command.process_command_cli({});
                console.log('-----------------------------------------')

            } catch (error){
                console.log(error);            
            }
        }

    }
}