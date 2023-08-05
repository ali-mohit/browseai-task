"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(code, msg, data) {
        super(msg);
        this.code = code;
        this.error_message = msg;
        this.message = msg;
        if (data) {
        }
    }
}
exports.AppException = AppException;
//# sourceMappingURL=exception.js.map