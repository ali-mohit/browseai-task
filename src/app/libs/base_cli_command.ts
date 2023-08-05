import yargs, {Argv, ArgumentsCamelCase, Options} from 'yargs'

import {CommandOption} from './command_option'


export abstract class BaseCliCommand{
    constructor(
        readonly name: string, 
        readonly description: string
    ){}
    
    abstract get_option_list():{[key: string]: CommandOption};
    public async process_command(_: ArgumentsCamelCase){};
    
    public create_command(): void{
        let yargs_option_list: {[key: string]: Options} = {};
        let cmd_option_list = this.get_option_list();

        for(let key in cmd_option_list){
            let opt = cmd_option_list[key].get_yargs_option()
            yargs_option_list[key] = opt
        }

        yargs.command(
            this.name, 
            this.description, 
            yargs_option_list,
            async (argv) => {
               await this.process_command(argv)
            }
        );
    }
}