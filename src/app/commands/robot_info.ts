import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';
import { CmdConf } from '../app_configuration/cmd_config';
import { get_robot_detail, print_robot_info } from '../core/robot_services';
import { AppException } from '../core/exception';

export class RobotInfoCommand extends BaseCliCommand {

    constructor(private app_config:CmdConf){
        super("robot_info", "retrieve information of a robot by api key and robot id");
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
            robot_id : new CommandOption(
                'id',
                'i',
                'string',
                'ROBOT ID',
                true,
                "",
            ),
        };
    }

    async process_command(argv: ArgumentsCamelCase) {
        console.log("Starting to Get a Robot information")
         
        const result = await get_robot_detail(this.app_config.base_url, String(argv.api_key), String(argv.robot_id));

        if(result[1]) {
            let err_code = -1;
            err_code = result[1].response?.status?? -1;
            throw new AppException(err_code, result[1].response?.statusText??"", result[1]);
        }

        if(result[0])
            print_robot_info(result[0]);
        else
            console.log('robot id not found!');
    }

}