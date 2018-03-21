import AjaxResponse from './AjaxResponse';
export interface BadUrl {
    kind: 'bad-url';
    message: string;
}
export declare function badUrl(message: string): HttpError;
export interface Timeout {
    kind: 'timeout';
}
export declare function timeout(): HttpError;
export interface NetworkError {
    kind: 'network-error';
}
export declare function networkError(): HttpError;
export interface BadStatus {
    kind: 'bad-status';
    response: AjaxResponse;
}
export declare function badStatus(response: AjaxResponse): HttpError;
export interface BadPayload {
    kind: 'bad-payload';
    message: string;
    response: AjaxResponse;
}
export declare function badPayload(message: string, response: AjaxResponse): HttpError;
export declare type HttpError = BadUrl | Timeout | NetworkError | BadStatus | BadPayload;
