"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Http = require("./Http");
var HttpError = require("./HttpError");
var Request = require("./Request");
var RequestBuilder_1 = require("./RequestBuilder"), RequestBuilderFns = RequestBuilder_1;
exports.default = __assign({}, Http, HttpError, { RequestBuilder: RequestBuilder_1.default }, RequestBuilderFns, Request);
//# sourceMappingURL=index.js.map