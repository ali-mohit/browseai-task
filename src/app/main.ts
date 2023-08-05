import yargs from "yargs"

import {BaseCliCommand} from './libs/base_cli_command'

import {VersionCommand} from './commands/version'
import {HelloWorldCommand} from './commands/hello_world'
import {RobotListCommand} from './commands/robot_list'
import {RobotInfoCommand} from './commands/robot_info'
import {RobotRunCommand} from './commands/robot_run'
import { get_cmd_config } from "./app_configuration/cmd_config"
import { CliCommand } from "./commands/cli"

export function test_ctrl(name: string): number{
    console.log("Hello,", name)

    return 0;
}


async function run_app() {
    let conf = get_cmd_config();

    let func_list: BaseCliCommand[] = [
        new RobotListCommand(conf),
        new RobotInfoCommand(conf),
        new RobotRunCommand(conf),
        new HelloWorldCommand(),
        new VersionCommand(),
    ]

    let cli = new CliCommand(conf, func_list);
    func_list.push(cli);
    
    for(var cls_obj of func_list){
        cls_obj.create_command();
    }

    yargs.argv;

    return 0;
}

if (typeof require !== "undefined" && require.main === module) {
    const p = run_app();
}
