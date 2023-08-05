import {Options} from 'yargs'

export type CommandOptionType = 'number' | 'boolean' | 'string' | 'array' 

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
        let result: Options = {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: this.type,
        };

        if(this.choices)
            result.choices = this.choices;

        if(this.defaultValue)
            result.default = this.defaultValue;

        return result;
    }
}