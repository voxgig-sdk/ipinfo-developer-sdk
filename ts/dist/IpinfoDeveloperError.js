"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpinfoDeveloperError = void 0;
class IpinfoDeveloperError extends Error {
    isIpinfoDeveloperError = true;
    sdk = 'IpinfoDeveloper';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IpinfoDeveloperError = IpinfoDeveloperError;
//# sourceMappingURL=IpinfoDeveloperError.js.map