import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';

export class VersionCommand extends BaseCliCommand{
    constructor(){
        super("version", "returns version of applications")
    }

    get_option_list(): { [key: string]: CommandOption; } {
        return {}
    }

    async process_command(_: ArgumentsCamelCase) {
        console.log("Browse AI CLI v1.0.0");
    }

}
