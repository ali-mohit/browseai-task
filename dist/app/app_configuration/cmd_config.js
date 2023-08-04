"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_cmd_config = exports.CmdConf = void 0;
class CmdConf {
    constructor(base_url) {
        this.base_url = base_url;
    }
}
exports.CmdConf = CmdConf;
function get_cmd_config() {
    return new CmdConf("https://api.browse.ai");
}
exports.get_cmd_config = get_cmd_config;
//# sourceMappingURL=cmd_config.js.map