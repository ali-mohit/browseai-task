export class CmdConf{
    constructor(
        readonly base_url: string,
    ){}
}


export function get_cmd_config(): CmdConf{
    return new CmdConf("https://api.browse.ai");
}