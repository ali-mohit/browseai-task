import {Argv} from 'yargs'

export function version_command(arg_obj: Argv<{}>){
    arg_obj.command(
        "version", 
        "returns version of applications", 
        {
            //Adding Options
        },
        (_) => {
            console.log("Browse AI CLI v1.0.0");
        }
    );
}
