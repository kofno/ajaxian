import Task from 'taskarian';
import { HttpError } from './HttpError';
import { Request } from './Request';
export declare function toHttpTask<A>(request: Request<A>): Task<HttpError, A>;
/**
 * A function helper that can be chained to an error using orElse so that
 * 404s can be handled as a successful call, if desired.
 */
export declare function ignore404With<A>(f: (e: HttpError) => A): (err: HttpError) => Task<HttpError, A>;
