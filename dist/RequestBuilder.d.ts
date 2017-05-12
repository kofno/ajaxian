import Request, { DecoderFn, Method } from './Request';
/**
 * A different approach to building a request object. Instead of object
 * literals, we can use this builder object to contruct a request in stages.
 * Modifications are immutable. A new instance of the RequestBuilder is
 * returned in each case.
 */
declare class RequestBuilder<A> {
    private readonly request;
    constructor(aRequest: Request<A>);
    readonly url: string;
    readonly method: Method;
    readonly data: any;
    readonly timeout: number;
    readonly headers: string[][];
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
export declare function get<A>(url: string, decoder: DecoderFn<A>): RequestBuilder<A>;
/**
 * A convenient function for creating a basic get request and returning the
 * results as a string.
 */
export declare function getString(url: string): RequestBuilder<string>;
/**
 * A convenient function for creating a basic post request.
 */
export declare function post<A>(url: string, data: any, decoder: DecoderFn<A>): RequestBuilder<A>;
/**
 * A convenient function for creating a basic put request.
 */
export declare function put<A>(url: string, data: any, decoder: DecoderFn<A>): RequestBuilder<A>;
