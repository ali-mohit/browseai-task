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
exports.print_robot_list = exports.get_robot_list = void 0;
const axios_1 = __importDefault(require("axios"));
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
//# sourceMappingURL=robot.js.map