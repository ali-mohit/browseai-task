"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const main_1 = require("../app/main");
(0, globals_1.describe)('testing project test procedures', () => {
    (0, globals_1.test)('run test_ctrl method', () => {
        (0, globals_1.expect)((0, main_1.test_ctrl)('ALI MOHIT')).toBe(0);
    });
});
//# sourceMappingURL=main.test.js.map