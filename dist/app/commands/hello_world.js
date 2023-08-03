"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello_world_command = void 0;
function hello_world_command(arg_obj) {
    arg_obj.command("hello", "says hello world", {
        name: {
            alias: 'n',
            describe: 'Your Name',
            demandOption: false,
            type: 'string'
        }
    }, (argv) => {
        if (argv.name)
            console.log("Hello ", argv.name);
        else
            console.log("Hello, World");
    });
}
exports.hello_world_command = hello_world_command;
//# sourceMappingURL=hello_world.js.map