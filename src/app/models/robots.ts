import {InputParameters} from './input_parameters'

export class Robot{
    constructor(
        readonly id:string,
        readonly name: string,
        readonly createAt: number,
        public input_parameters: InputParameters[]
    ){}
}