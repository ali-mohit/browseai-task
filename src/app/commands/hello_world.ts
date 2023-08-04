import {ArgumentsCamelCase} from 'yargs'

import {BaseCliCommand} from '../libs/base_cli_command'
import {CommandOption} from '../libs/command_option'

export class HelloWorldCommand extends BaseCliCommand {
    constructor(){
        super("hello", "says hello to world")
    }

    public process_command(argv: ArgumentsCamelCase): void {
        if (argv.name){
            console.log("Hello ", argv.name);
            return;
        }
        
        console.log("Hello, World");
    }

    public get_option_list(): { [key: string]: CommandOption; } {
        return {
            name: new CommandOption(
                'name',
                'n',
                'string',
                'Your Name',
                false,
                "",
            ),
        };
    }
}
