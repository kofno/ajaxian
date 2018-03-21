"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function badUrl(message) {
    return { kind: 'bad-url', message: message };
}
exports.badUrl = badUrl;
function timeout() { return { kind: 'timeout' }; }
exports.timeout = timeout;
function networkError() {
    return { kind: 'network-error' };
}
exports.networkError = networkError;
function badStatus(response) {
    return { kind: 'bad-status', response: response };
}
exports.badStatus = badStatus;
function badPayload(message, response) {
    return { kind: 'bad-payload', message: message, response: response };
}
exports.badPayload = badPayload;
//# sourceMappingURL=HttpError.js.map