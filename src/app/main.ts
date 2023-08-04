import yargs from "yargs"

import {BaseCliCommand} from './libs/base_cli_command'

import {VersionCommand} from './commands/version'
import {HelloWorldCommand} from './commands/hello_world'
import {RobotListCommand} from './commands/robot_list'

export function test_ctrl(name: string): number{
    console.log("Hello,", name)

    return 0;
}

function run_app(): number{
    
    let func_list: BaseCliCommand[] = [
        new VersionCommand(),
        new HelloWorldCommand(),
        new RobotListCommand(),
    ]
    
    for(var cls_obj of func_list){
        cls_obj.create_command(yargs);
    }

    yargs.argv
    
    return 0;
}

if (typeof require !== "undefined" && require.main === module) {
    let return_code = run_app();

    process.exit(return_code)
}
