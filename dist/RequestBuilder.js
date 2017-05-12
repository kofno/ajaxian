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
var resulty_1 = require("resulty");
/**
 * A different approach to building a request object. Instead of object
 * literals, we can use this builder object to contruct a request in stages.
 * Modifications are immutable. A new instance of the RequestBuilder is
 * returned in each case.
 */
var RequestBuilder = (function () {
    function RequestBuilder(aRequest) {
        this.request = aRequest;
    }
    Object.defineProperty(RequestBuilder.prototype, "url", {
        get: function () { return this.request.url; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "method", {
        get: function () { return this.request.method; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "data", {
        get: function () { return this.request.data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "timeout", {
        get: function () { return this.request.timeout; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "headers", {
        get: function () { return this.request.headers; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "withCredentials", {
        get: function () { return this.request.withCredentials; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestBuilder.prototype, "decoder", {
        get: function () { return this.request.decoder; },
        enumerable: true,
        configurable: true
    });
    RequestBuilder.prototype.withData = function (data) {
        return new RequestBuilder(__assign({}, this.request, { data: data }));
    };
    RequestBuilder.prototype.withTimeout = function (timeout) {
        return new RequestBuilder(__assign({}, this.request, { timeout: timeout }));
    };
    RequestBuilder.prototype.setWithCredentials = function (withCredentials) {
        return new RequestBuilder(__assign({}, this.request, { withCredentials: withCredentials }));
    };
    RequestBuilder.prototype.withDecoder = function (decoder) {
        return new RequestBuilder(__assign({}, this.request, { decoder: decoder }));
    };
    RequestBuilder.prototype.withHeader = function (header) {
        return new RequestBuilder(__assign({}, this.request, { headers: this.request.headers.concat([header]) }));
    };
    return RequestBuilder;
}());
exports.default = RequestBuilder;
/**
 * A convenient function for creating a basic get request.
 */
function get(url) {
    return new RequestBuilder({
        url: url,
        decoder: resulty_1.ok,
        method: 'get',
        timeout: 0,
        data: '',
        headers: [],
        withCredentials: true,
    });
}
exports.get = get;
/**
 * A convenient function for creating a basic post request.
 */
function post(url) {
    return new RequestBuilder({
        url: url,
        decoder: resulty_1.ok,
        data: {},
        method: 'post',
        timeout: 0,
        headers: [],
        withCredentials: true,
    });
}
exports.post = post;
/**
 * A convenient function for creating a basic put request.
 */
function put(url) {
    return new RequestBuilder({
        url: url,
        decoder: resulty_1.ok,
        data: {},
        method: 'put',
        timeout: 0,
        headers: [],
        withCredentials: true,
    });
}
exports.put = put;
//# sourceMappingURL=RequestBuilder.js.map