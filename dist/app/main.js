"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_ctrl = void 0;
function test_ctrl(name) {
    console.log("Hello,", name);
    return 0;
}
exports.test_ctrl = test_ctrl;
function run_app() {
    console.log('Hello, World From BrowseAI');
    return 0;
}
if (typeof require !== "undefined" && require.main === module) {
    let return_code = run_app();
    process.exit(return_code);
}
console.log("Hello, World 2");
//# sourceMappingURL=main.js.map