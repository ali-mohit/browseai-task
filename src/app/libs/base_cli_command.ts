import yargs, {ArgumentsCamelCase, Options} from 'yargs'

import { CommandOption } from './command_option'
import inquirer, { Answers, Question } from 'inquirer';
import { AppException } from '../core/exception';


export abstract class BaseCliCommand{
    constructor(
        readonly name: string, 
        readonly description: string
    ){}
    
    abstract get_option_list():{[key: string]: CommandOption};
    public async process_command(_: ArgumentsCamelCase){};
    public async process_command_cli(_: {[key: string]: any}) {};
    
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

    public build_cli_inputs(): Question<{}>[] {
        let result: Question<{}>[] = [];
        let cmd_option_list = this.get_option_list();
        
        for(let key in cmd_option_list){
            if(!cmd_option_list[key].showInActiveCli)
                continue;
            
            let opt = cmd_option_list[key].get_inquirer_option();

            result.push(opt);
        }

        return result;
    }

    public async run_cli(questions: Question[]): Promise<[Answers | null, AppException | null]>{
        try{
            let answers = await inquirer.prompt(questions);

            return [answers, null]
        } catch(error) {
            if(error as Error)
                return [null, new AppException(-100, (error as Error).message, null)]

            if(error as AppException)
                return [null, (error as AppException)]

            return [null, new AppException(-100, (error as string), null)]
        }
    }
}