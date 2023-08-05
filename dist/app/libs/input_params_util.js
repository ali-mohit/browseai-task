"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_cli_question_by_input_parameters = void 0;
function build_cli_question_by_input_parameters(param) {
    if (param.type != "number" && param.type != "url" && param.type != "text" && param.type != "boolean")
        throw `field "${param.label} (${param.name})" type not found for cli questions!`;
    let result = {};
    if (param.type == "number") {
        result = {
            type: "number",
            name: param.name,
            message: param.label,
        };
    }
    else if (param.type == "boolean") {
        result = {
            type: "confirm",
            name: param.name,
            message: param.label
        };
    }
    else {
        result = {
            type: "input",
            name: param.name,
            message: param.label
        };
    }
    if (param.defaultValue)
        result.default = param.defaultValue;
    return result;
}
exports.build_cli_question_by_input_parameters = build_cli_question_by_input_parameters;
//# sourceMappingURL=input_params_util.js.map