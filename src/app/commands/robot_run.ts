import {ArgumentsCamelCase} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';
import { CmdConf } from '../app_configuration/cmd_config';
import { get_robot_detail, print_robot_info, robot_run } from '../core/robot_services';
import { AppException } from '../core/exception';

export class RobotRunCommand extends BaseCliCommand {

    constructor(private app_config:CmdConf){
        super("robot_run", "run a task for specific robot by api key and robot id");
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
            default_parameters : new CommandOption(
                'default',
                'd',
                'string',
                'Making a new job by default parameters',
                true,
                "yes",
                true,
                ["yes", "no", "y", "n", "true", "false", "t", "f"],
            ),
            parameters : new CommandOption(
                'parameters_json_file_address',
                'p',
                'string',
                'address of task parameters as a json file (exmpale: ./temp.js)',
                false,
                "",
                false,  //showing in active cli
            ),
        };
    }

    async process_command(argv: ArgumentsCamelCase) {
        console.log("Starting to run a task")
        
        let using_default_parameters = true

        const pod_result = await get_robot_detail(this.app_config.base_url, String(argv.api_key), String(argv.robot_id));

        if(pod_result[1]) {
            let err_code = -1;
            err_code = pod_result[1].response?.status?? -1;
            throw new AppException(err_code, pod_result[1].response?.statusText??"", pod_result[1]);
        }

        if(!pod_result[0])
            throw new AppException(-1, "robot id not found", null)
        
        let use_default = String(argv.default_parameters)?.toLowerCase()??"";
        if(use_default && (use_default == "yes" || use_default == "y" || use_default == "true"))
            using_default_parameters = true;
        else
            using_default_parameters = false;
        
        const result = await robot_run(
            this.app_config.base_url,
            String(argv.api_key),
            pod_result[0],
            String(argv.robot_id),
            using_default_parameters,
            String(argv.parameters)
        );

        if(result[1]) {
            throw result[1];
        }

        console.table(result[0]);
    }
}