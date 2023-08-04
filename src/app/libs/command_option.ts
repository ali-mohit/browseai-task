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
    ){}
    
    public get_yargs_option(): Options {
        return {
            alias: this.alias,
            describe: this.describe,
            demandOption: this.demandOption,
            type: this.type,
        };
    }
}