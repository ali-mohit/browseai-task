import {ArgumentsCamelCase, parseAsync} from 'yargs'

import { BaseCliCommand } from '../libs/base_cli_command';
import { CommandOption } from '../libs/command_option';
import { CmdConf } from '../app_configuration/cmd_config';
import { get_robot_detail, get_robot_list, robot_run, robot_run_from_file } from '../core/robot_services';
import { AppException } from '../core/exception';
import { Robot } from '../models/robot_model';
import { Question, ListQuestion } from 'inquirer';
import { build_cli_question_by_input_parameters } from '../libs/input_params_util';

export class RobotRunCommand extends BaseCliCommand {

    constructor(private app_config:CmdConf){
        super("robot_run", "run a task for specific robot by api key and robot id");
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
            robot_id : new CommandOption(
                'id',
                'i',
                'string',
                'ROBOT ID',
                true,
                "",
                false,  //not showing in active cli
            ),
            default_parameters : new CommandOption(
                'default',
                'd',
                'string',
                'Making a new job by default parameters',
                true,
                "yes",
                false,  //not showing in active cli
                ["yes", "no", "y", "n", "true", "false", "t", "f"],
            ),
            parameters : new CommandOption(
                'parameters_json_file_address',
                'p',
                'string',
                'address of task parameters as a json file (exmpale: ./temp.js)',
                false,
                "",
                false,  //not showing in active cli
            ),
        };
    }

    async process_command(argv: ArgumentsCamelCase) {
        console.log("Starting to run a task")
        
        let using_default_parameters = true

        const robot = await this.find_robot(String(argv.api_key), String(argv.robot_id));
        
        let use_default = String(argv.default_parameters)?.toLowerCase()??"";
        if(use_default && (use_default == "yes" || use_default == "y" || use_default == "true"))
            using_default_parameters = true;
        else
            using_default_parameters = false;
        
        const result = await robot_run_from_file(
            this.app_config.base_url,
            String(argv.api_key),
            robot,
            String(argv.robot_id),
            using_default_parameters,
            String(argv.parameters)
        );

        if(result[1]) {
            throw result[1];
        }

        console.table(result[0]);
    }

    public async process_command_cli(_: {[key: string]: any}) {

        // #region Get API KEY
        let cli_result = await this.run_cli(this.build_cli_inputs());
        if(cli_result[1])
            throw cli_result[1];
        else if(cli_result[0] == null) {
            throw 'cli returned NULL value.';
        }
        // #endregion

        // #region Making list of robots
        const robot_list = await get_robot_list(this.app_config.base_url, cli_result[0].api_key)
        if(robot_list[1])
            throw robot_list[1];

        let robot_choices = [];
        
        for(let index in robot_list[0]){
            let robot_item = robot_list[0][index];
            robot_choices.push(robot_item.name + " |[" + robot_item.id + "]")
        }

        let cli_questions_step_02: Question<{}>[] = [];
        let expand: ListQuestion = {
            type: "list",
            name: "id",
            message: "Select the robot that you want to make a job",
            choices:robot_choices,
        }
        cli_questions_step_02.push(expand);
        cli_questions_step_02.push({
            type: "confirm",
            name: "making_by_default",
            message: "Making a new job by default parameters",
        });   
        let cli_result_step_02 = await this.run_cli(cli_questions_step_02);

        if(cli_result_step_02[1])
            throw cli_result_step_02[1];
        else if(cli_result_step_02[0] == null) {
            throw 'cli returned NULL value. (step 02)';
        }

        // #endregion
        
        // #region fetch robot_info and making parameters
        let robot_id = cli_result_step_02[0].id.split('|')[1].replace("[", "").replace("]", "");

        const robot = await this.find_robot(cli_result[0].api_key, robot_id);

        let parameters: {} | null = {}

        if(!cli_result_step_02[0].making_by_default){
            parameters = await this.get_robot_parameters_by_cli(robot);
        } else {
            parameters = null;
        }

        // #endregion

        const result = await robot_run(
            this.app_config.base_url,
            cli_result[0].api_key,
            robot,
            robot_id,
            cli_result_step_02[0].making_by_default,
            parameters,
            true,
        );

        if(result[1]) {
            throw result[1];
        }

        console.table(result[0]);
    }

    private async find_robot(api_key: string, robot_id: string): Promise<Robot>{
        const pod_result = await get_robot_detail(this.app_config.base_url, api_key, robot_id);

        if(pod_result[1]) {
            let err_code = -1;
            err_code = pod_result[1].response?.status?? -1;
            throw new AppException(err_code, pod_result[1].response?.statusText??"", pod_result[1]);
        }

        if(!pod_result[0])
            throw new AppException(-1, "robot id not found", null);

        return pod_result[0];
    }

    private async get_robot_parameters_by_cli(robot: Robot): Promise<{}>{

        if(!robot.inputParameters || robot.inputParameters.length == 0){
            return {};
        }

        let cli_questions : Question<{}>[] = [];
        
        for(let param_index in robot.inputParameters){
            let question = build_cli_question_by_input_parameters(robot.inputParameters[param_index])

            cli_questions.push(question);
        }

        let cli_result = await this.run_cli(cli_questions);

        if(cli_result[1])
            throw cli_result[1];
        else if(cli_result[0] == null) {
            throw 'cli returned NULL value. (get_parameters_by_cli)';
        }

        return cli_result[0];
    }
}