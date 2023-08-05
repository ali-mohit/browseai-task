import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';
import { CmdConf } from '../app_configuration/cmd_config';
import { get_robot_list, print_robot_list } from '../core/robot_services';
import { AppException } from '../core/exception';

export class RobotListCommand extends BaseCliCommand {

    constructor(private app_config:CmdConf){
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

    async process_command(argv: ArgumentsCamelCase) {
        console.log("Starting to Get Robot List")
         
        const result = await get_robot_list(this.app_config.base_url, String(argv.api_key));

        if(result[1]) {
            let err_code = -1;
            err_code = result[1].response?.status?? -1;
            throw new AppException(err_code, result[1].response?.statusText??"", result[1]);
        }

        print_robot_list(result[0]);
    }
}