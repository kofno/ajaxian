"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = function (field, value) { return ({
    field: field,
    value: value,
}); };
/**
 * Parse response headers into an array of tuples
 */
function parseHeaders(text) {
    var makeHeader = function (_a) {
        var field = _a[0], value = _a[1];
        return exports.header(field, value);
    };
    return text.split('\r\n').map(function (s) { return s.split(':'); }).map(makeHeader);
}
exports.parseHeaders = parseHeaders;
//# sourceMappingURL=Headers.js.map