import {InputParameters} from './input_parameters'

export type Robot = {
    id: string;
    name: string;
    createdAt: Date;
    inputParameters: InputParameters[];
}
