"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resulty_1 = require("resulty");
var taskarian_1 = require("taskarian");
var Headers_1 = require("./Headers");
var HttpError_1 = require("./HttpError");
function send(xhr, data) {
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data instanceof String ? data : JSON.stringify(data));
    }
    else {
        xhr.send();
    }
}
function handleResponse(xhr, decoder) {
    var response = {
        body: xhr.response,
        headers: Headers_1.parseHeaders(xhr.getAllResponseHeaders()),
        status: xhr.status,
        statusText: xhr.statusText,
    };
    if (xhr.status < 200 || xhr.status >= 300) {
        response.body = xhr.responseText;
        return resulty_1.err(HttpError_1.badStatus(response));
    }
    else {
        var result = decoder(response.body);
        return result.cata({
            Err: function (error) { return resulty_1.err(HttpError_1.badPayload(error, response)); },
            Ok: function (r) { return resulty_1.ok(r); },
        });
    }
}
function configureRequest(xhr, request) {
    xhr.setRequestHeader('Accept', 'application/json');
    var setHeader = function (header) { return xhr.setRequestHeader(header[0], header[1]); };
    xhr.withCredentials = request.withCredentials;
    xhr.timeout = request.timeout || 0;
}
/*
 * Converts a request object to an Http Task.
 */
function toHttpTask(request) {
    return new taskarian_1.default(function (reject, resolve) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('error', function () { return reject(HttpError_1.networkError()); });
        xhr.addEventListener('timeout', function () { return reject(HttpError_1.timeout()); });
        xhr.addEventListener('load', function () {
            return handleResponse(xhr, request.decoder).cata({
                Err: function (e) { return reject(e); },
                Ok: function (d) { return resolve(d); },
            });
        });
        try {
            xhr.open(request.method, request.url, true);
        }
        catch (e) {
            reject(HttpError_1.badUrl(request.url));
        }
        configureRequest(xhr, request);
        send(xhr, request.data);
        return xhr.abort;
    });
}
exports.toHttpTask = toHttpTask;
/**
 * Convenience function that will help make switch statements exhaustive
 */
function assertNever(x) {
    throw new TypeError("Unexpected object: " + x);
}
/**
 * A function helper that can be chained to an error using orElse so that
 * 404s can be handled as a successful call, if desired.
 */
function ignore404With(f) {
    return function (err) {
        return new taskarian_1.default(function (reject, resolve) {
            switch (err.kind) {
                case 'bad-url': return reject(err);
                case 'timeout': return reject(err);
                case 'network-error': return reject(err);
                case 'bad-payload': return reject(err);
                case 'bad-status':
                    var response = err.response;
                    return response.status === 404 ? resolve(f(err)) : reject(err);
                default:
                    assertNever(err);
            }
        });
    };
}
exports.ignore404With = ignore404With;
//# sourceMappingURL=Http.js.map