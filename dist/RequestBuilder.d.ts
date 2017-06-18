import Request, { DecoderFn, Method } from './Request';
/**
 * A different approach to building a request object. Instead of object
 * literals, we can use this builder object to contruct a request in stages.
 * Modifications are immutable. A new instance of the RequestBuilder is
 * returned in each case.
 */
export declare class RequestBuilder<A> {
    private readonly request;
    constructor(aRequest: Request<A>);
    readonly url: string;
    readonly method: Method;
    readonly data: any;
    readonly timeout: number;
    readonly headers: Array<[string, string]>;
    readonly withCredentials: boolean;
    readonly decoder: DecoderFn<A>;
    withData(data: any): RequestBuilder<A>;
    withTimeout(timeout: number): RequestBuilder<A>;
    setWithCredentials(withCredentials: boolean): RequestBuilder<A>;
    withDecoder<B>(decoder: DecoderFn<B>): RequestBuilder<B>;
    withHeader(header: [string, string]): RequestBuilder<A>;
}
export default RequestBuilder;
/**
 * A convenient function for creating a basic get request.
 */
export declare function get(url: string): RequestBuilder<string>;
/**
 * A convenient function for creating a basic post request.
 */
export declare function post(url: string): RequestBuilder<string>;
/**
 * A convenient function for creating a basic put request.
 */
export declare function put(url: string): RequestBuilder<string>;
/**
 * A convenient function for create a basic delete request.
 */
export declare function del(url: string): RequestBuilder<string>;
