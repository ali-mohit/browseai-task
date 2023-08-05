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
                'password',
                'BrowseAI API KEY',
                true,
                "",
            ),
        };
    }

    async process_command(argv: ArgumentsCamelCase) {
        console.log("Starting to Get Robot List")
        
        await this.main_process(String(argv.api_key));
    }

    public async process_command_cli(_: {[key: string]: any}) {        
        let cli_result = await this.run_cli(this.build_cli_inputs());

        if(cli_result[1])
            throw cli_result[1];
        else if(cli_result[0] == null) {
            throw 'cli returned NULL value.';
        }

        await this.main_process(cli_result[0].api_key);
    }

    private async main_process(api_key: string){
        const result = await get_robot_list(this.app_config.base_url, api_key);

        if(result[1]) {
            let err_code = -1;
            err_code = result[1].response?.status?? -1;
            throw new AppException(err_code, result[1].response?.statusText??"", result[1]);
        }

        print_robot_list(result[0]);
    }
}