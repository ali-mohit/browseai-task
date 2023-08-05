"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_robot_info = exports.print_robot_list = exports.validate_input_parameters = exports.robot_run = exports.get_robot_detail = exports.get_robot_list = void 0;
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const exception_1 = require("./exception");
function get_robot_list(base_url, api_key) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = base_url + "/v2/robots";
        try {
            const response = yield axios_1.default.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`,
                }
            });
            return [response.data.robots.items, null];
        }
        catch (error) {
            let err = error;
            return [[], err];
        }
    });
}
exports.get_robot_list = get_robot_list;
function get_robot_detail(base_url, api_key, robot_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = base_url + "/v2/robots/" + robot_id;
        try {
            const response = yield axios_1.default.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`,
                }
            });
            return [response.data.robot, null];
        }
        catch (error) {
            let err = error;
            return [null, err];
        }
    });
}
exports.get_robot_detail = get_robot_detail;
function robot_run(base_url, api_key, robot, robot_id, use_default_parameters, parameters_file_address) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let inputParametersData = null;
        try {
            if (!use_default_parameters) {
                const parameters_str = fs.readFileSync(parameters_file_address, 'utf-8');
                let parameters = JSON.parse(parameters_str);
                let validate_result = validate_input_parameters(robot, parameters);
                if (validate_result[1] != null) {
                    let exp = new exception_1.AppException(400, "validation of input parameters was failed: " + validate_result[1].message, validate_result[1]);
                    throw exp;
                }
                inputParametersData = validate_result[0];
            }
        }
        catch (error) {
            let app_ex = new exception_1.AppException(400, String(error), null);
            return [null, app_ex];
        }
        try {
            const url = base_url + "/v2/robots/" + robot_id + "/tasks";
            let data = {
                recordVideo: false,
                inputParameters: inputParametersData,
            };
            const response = yield axios_1.default.post(url, data, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`,
                },
            });
            return [response.data.result, null];
        }
        catch (error) {
            let err = error;
            return [null, new exception_1.AppException((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 400, err.message, err)];
        }
    });
}
exports.robot_run = robot_run;
function validate_input_parameters(robot, inputData) {
    try {
        if (robot == null) {
            throw "ROBOT information not found!";
        }
        if (robot.inputParameters == null || robot.inputParameters.length == 0) {
            return [inputData, null];
        }
        let returned_result = {};
        for (let index in robot.inputParameters) {
            let rule = robot.inputParameters[index];
            if (rule.type == "number" && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)) {
                if (rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;
                let currentValue = inputData[rule.name];
                if (typeof (currentValue) != "number")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof (currentValue)}"`;
                if (rule.min && rule.min > currentValue)
                    throw `field "${rule.label} (${rule.name})" should be greater than or equal to "${rule.min}"`;
                if (rule.max && rule.max < currentValue)
                    throw `field "${rule.label} (${rule.name})" should be less than or equal to "${rule.max}"`;
                returned_result[rule.name] = currentValue;
            }
            else if (rule.type == "url" && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)) {
                if (rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;
                let currentValue = inputData[rule.name];
                if (typeof (currentValue) != "string")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof (currentValue)}"`;
                returned_result[rule.name] = currentValue;
            }
            else if ((rule.type == "boolean" || rule.type == "bool") && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)) {
                if (rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;
                let currentValue = inputData[rule.name];
                if (typeof (currentValue) != "boolean")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof (currentValue)}"`;
                returned_result[rule.name] = currentValue;
            }
            else if ((rule.type == "text" || rule.type == "string") && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)) {
                if (rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;
                let currentValue = inputData[rule.name];
                if (typeof (currentValue) != "string")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof (currentValue)}"`;
                returned_result[rule.name] = currentValue;
            }
            else if (rule.required || Object.keys(inputData).indexOf(rule.name) != -1) {
                if (rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;
                let currentValue = inputData[rule.name];
                returned_result[rule.name] = currentValue;
            }
        }
        return [returned_result, null];
    }
    catch (error) {
        let err = new exception_1.AppException(400, String(error), null);
        return [null, err];
    }
}
exports.validate_input_parameters = validate_input_parameters;
function print_robot_list(robots) {
    let render_table = [];
    for (let i = 0; i < robots.length; i++) {
        render_table.push({
            id: robots[i].id,
            name: robots[i].name,
            createdAt: new Date(robots[i].createdAt),
        });
    }
    console.table(render_table);
}
exports.print_robot_list = print_robot_list;
function print_robot_info(robot) {
    print_robot_list([robot]);
    console.log('The Robot Input Parameters: ');
    console.table(robot.inputParameters);
}
exports.print_robot_info = print_robot_info;
//# sourceMappingURL=robot_services.js.map