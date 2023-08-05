import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';

export class VersionCommand extends BaseCliCommand{

    private app_version: string;
    constructor(){
        super("version", "returns version of applications")

        this.app_version = "Browse AI CLI v1.0.0";
    }

    get_option_list(): { [key: string]: CommandOption; } {
        return {}
    }

    async process_command(_: ArgumentsCamelCase) {
        console.log(this.app_version);
    }

    public async process_command_cli(_: {[key: string]: any}) {
        console.log(this.app_version)
    }
}
