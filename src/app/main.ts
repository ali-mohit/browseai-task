import yargs from "yargs"
import {version_command} from './commands/version'
import {hello_world_command} from './commands/hello_world'

export function test_ctrl(name: string): number{
    console.log("Hello,", name)

    return 0;
}

function run_app(): number{

    version_command(yargs)
    hello_world_command(yargs)
    
    yargs.argv

    return 0;
}

if (typeof require !== "undefined" && require.main === module) {
    let return_code = run_app();

    process.exit(return_code)
}
