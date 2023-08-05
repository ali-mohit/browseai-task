"use strict";
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
exports.BaseCliCommand = void 0;
const yargs_1 = __importDefault(require("yargs"));
const inquirer_1 = __importDefault(require("inquirer"));
const exception_1 = require("../core/exception");
class BaseCliCommand {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    process_command(_) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    process_command_cli(_) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    create_command() {
        let yargs_option_list = {};
        let cmd_option_list = this.get_option_list();
        for (let key in cmd_option_list) {
            let opt = cmd_option_list[key].get_yargs_option();
            yargs_option_list[key] = opt;
        }
        yargs_1.default.command(this.name, this.description, yargs_option_list, (argv) => __awaiter(this, void 0, void 0, function* () {
            yield this.process_command(argv);
        }));
    }
    build_cli_inputs() {
        let result = [];
        let cmd_option_list = this.get_option_list();
        for (let key in cmd_option_list) {
            if (!cmd_option_list[key].showInActiveCli)
                continue;
            let opt = cmd_option_list[key].get_inquirer_option();
            result.push(opt);
        }
        return result;
    }
    run_cli(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let answers = yield inquirer_1.default.prompt(questions);
                return [answers, null];
            }
            catch (error) {
                if (error)
                    return [null, new exception_1.AppException(-100, error.message, null)];
                if (error)
                    return [null, error];
                return [null, new exception_1.AppException(-100, error, null)];
            }
        });
    }
}
exports.BaseCliCommand = BaseCliCommand;
//# sourceMappingURL=base_cli_command.js.map