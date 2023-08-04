export class InputParameters{
    constructor(
        readonly type: string,
        readonly name: string,
        readonly label: string,
        readonly encrypted: boolean,
        readonly defaultValue: any
    ){}
}