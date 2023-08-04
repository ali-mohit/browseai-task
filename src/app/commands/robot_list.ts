import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';

export class RobotListCommand extends BaseCliCommand {

    constructor(){
        super("robot_list", "retrieve a list of your robots by api key");
    }

    get_option_list(): { [key: string]: CommandOption; } {
        return {
            api_key : new CommandOption(
                'api_key',
                'a',
                'string',
                'BrowseAI API KEY',
                true,
                "",
            ),
        };
    }

    process_command(argv: ArgumentsCamelCase): void {
        get_robot_list(String(argv.api_key))
    }
}

function get_robot_list(api_key: string): void{
    console.log('Hello, ', api_key)
}