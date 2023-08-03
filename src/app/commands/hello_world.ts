import {Argv} from 'yargs'

export function hello_world_command(arg_obj: Argv<{}>){
    arg_obj.command(
        "hello", 
        "says hello world", 
        {
            name: {
                alias: 'n',
                describe: 'Your Name',
                demandOption: false,
                type: 'string'
            }
        },
        (argv) => {
            if (argv.name)
                console.log("Hello ", argv.name)
            else
                console.log("Hello, World")
        }
    );
}
