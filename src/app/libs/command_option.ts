import { Options } from 'yargs'
import { Answers, Question, RawListQuestion } from 'inquirer'


export type CommandOptionType = 'number' | 'boolean' | 'string' | 'array' | 'password' 
export type CliOptionType = 'input' | 'number' | 'confirm' | 'rawlist' | 'password'

export function convert_command_option_to_cli_option(ctype: CommandOptionType): CliOptionType{
    if(ctype == "string")
        return "input";

    if(ctype == "number")
        return "number";

    if(ctype == "password")
        return "password";

    if(ctype == "array")
        return "rawlist";

    if(ctype == "boolean")
        return "confirm";

    return "input";
}

export class CommandOption{
    constructor(
        public name: string,
        public alias: string,
        public type: CommandOptionType = "string",
        public describe: string = "",
        public demandOption: boolean=false,
        public defaultValue: any = "",
        public showInActiveCli: boolean=true,
        public choices: string[] | undefined = undefined,
    ){}
    
    public get_yargs_option(): Options {

        let yargs_type = this.type;
        if (yargs_type == "password")
            yargs_type = "string"

        let result: Options = {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: yargs_type,
        };

        if(this.choices)
            result.choices = this.choices;

        if(this.defaultValue)
            result.default = this.defaultValue;

        return result;
    }

    public get_inquirer_option(): Question {
        
        if(this.type == "array"){
            let arrayResult : RawListQuestion = {
                type: 'rawlist',
                name: this.name,
                message: this.describe,
            }
            
            if(this.defaultValue)
                arrayResult.default = this.defaultValue;

            if(this.choices)
                arrayResult.choices = this.choices;

            return arrayResult;
        }

        let result: Question<Answers> = {
            type: convert_command_option_to_cli_option(this.type),
            name: this.name,
            message: this.describe,
            
        }

        if(this.defaultValue)
            result.default = this.defaultValue;

        return result;
    }
}