"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse response headers into an array of arrays
 */
function parseHeaders(text) {
    return text.split('\r\n').map(function (s) { return s.split(':'); });
}
exports.parseHeaders = parseHeaders;
//# sourceMappingURL=Headers.js.map