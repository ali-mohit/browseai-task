"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    constructor(id, name, createAt, input_parameters) {
        this.id = id;
        this.name = name;
        this.createAt = createAt;
        this.input_parameters = input_parameters;
    }
    static print_header() {
        console.log(`ID\t|name\t|createAt\t|`);
    }
    print_data() {
        console.log(`${this.id}\t|${this.name}\t|${this.createAt}\t|`);
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robots.js.map