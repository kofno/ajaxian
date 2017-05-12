"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse response headers into an array of tuples
 */
function parseHeaders(text) {
    var makeTuple = function (l) { return [l[0] || '', l[1] || '']; };
    return text.split('\r\n').map(function (s) { return s.split(':'); }).map(makeTuple);
}
exports.parseHeaders = parseHeaders;
//# sourceMappingURL=Headers.js.map