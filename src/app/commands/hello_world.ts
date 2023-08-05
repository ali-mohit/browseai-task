import {ArgumentsCamelCase} from 'yargs'

import {BaseCliCommand} from '../libs/base_cli_command'
import {CommandOption} from '../libs/command_option'

export class HelloWorldCommand extends BaseCliCommand {
    constructor(){
        super("hello", "says hello to world")
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

    public async process_command(argv: ArgumentsCamelCase) {
        if (argv.name){
            console.log("Hello ", argv.name);
            return;
        }
        
        console.log("Hello, World");
    }

    public async process_command_cli(_: {[key: string]: any}) {
        console.clear();
        
        let result = await this.run_cli(this.build_cli_inputs());

        if(result[1])
            throw result[1];
        else if(result[0] == null) {
            throw 'cli returned NULL value.';
        }

        if(result[0].name) {
            console.log("Hello ", result[0].name);
            return;
        }
        
        console.log("Hello, World");
    }
}
