import { Reject, Resolve, Task } from 'taskarian';
import AjaxResponse from './AjaxResponse';
import { Header } from './Headers';
import {
  badPayload,
  badStatus,
  HttpError,
  networkError,
  timeout,
} from './HttpError';
import { httpSuccess, HttpSuccess } from './HttpSuccess';
import { Request } from './Request';

function collectHeaders(response: Response): Header[] {
  const headers: Header[] = [];
  response.headers.forEach((value, key) => {
    headers.push({ field: key, value });
  });
  return headers;
}

function requestBody<T>(request: Request<T>): string | null {
  if (
    request.method === 'put' ||
    request.method === 'patch' ||
    request.method === 'post'
  ) {
    typeof request.data === 'string'
      ? request.data
      : JSON.stringify(request.data);
  }
  return null;
}

/**
 * Converts a request into a Task that performs an HTTP request and returns a response.
 *
 * @template A - The type of the request payload.
 * @param {Request<A>} request - The request object containing the details of the HTTP request.
 * @returns {Task<HttpError, HttpSuccess<A>>} A Task that performs the HTTP request and resolves with the response.
 *
 * The Task will:
 * - Reject with a `HttpError` if the request fails due to network issues, timeout, or a bad status code.
 * - Resolve with a `HttpSuccess<A>` if the request succeeds and the response payload is successfully decoded.
 *
 * The request can be aborted if it exceeds the specified timeout.
 */
export function toHttpResponseTask<A>(
  request: Request<A>,
): Task<HttpError, HttpSuccess<A>> {
  return new Task(
    (reject: Reject<HttpError>, resolve: Resolve<HttpSuccess<A>>) => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      let timeoutId: Timer | null = null;
      if (request.timeout && request.timeout > 0) {
        timeoutId = setTimeout(() => {
          abortController.abort();
          reject(timeout());
        }, request.timeout || 0);
      }

      const fetchOptions: RequestInit = {
        method: request.method,
        body: requestBody(request),
        headers: request.headers.reduce(
          (acc, header) => {
            acc[header.field] = header.value;
            return acc;
          },
          {} as Record<string, string>,
        ),
        credentials: request.withCredentials ? 'include' : 'same-origin',
        mode: 'cors',
        signal,
      };
      fetch(request.url, fetchOptions)
        .then(async (response) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          if (!response.ok) {
            const errorText = await response.text();
            const parsedHeaders = collectHeaders(response);
            const ajaxResponse: AjaxResponse = {
              body: errorText,
              headers: parsedHeaders,
              status: response.status,
              statusText: response.statusText,
            };
            return reject(badStatus(ajaxResponse));
          }
          const text = await response.text();
          const parsedHeaders = collectHeaders(response);
          const ajaxResponse: AjaxResponse = {
            body: text,
            headers: parsedHeaders,
            status: response.status,
            statusText: response.statusText,
          };
          const result = request.decoder(ajaxResponse.body);
          result.cata({
            Err: (error) => reject(badPayload(error, ajaxResponse)),
            Ok: (r) => resolve(httpSuccess(ajaxResponse, r)),
          });
        })
        .catch((error) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          if (error.name === 'AbortError') {
            return reject(timeout());
          }
          console.log('Network error', error);
          return reject(networkError());
        });
      return () => {
        abortController.abort();
      };
    },
  );
}

/**
 * Converts a given request into an HTTP task that returns the result of the request.
 *
 * @template A - The type of the request payload.
 * @param {Request<A>} request - The request to be converted into an HTTP task.
 * @returns {Task<HttpError, A>} - A task that, when executed, performs the HTTP request and returns the result.
 */
export const toHttpTask = <A>(request: Request<A>): Task<HttpError, A> =>
  toHttpResponseTask(request).map((r) => r.result);

/**
 * Convenience function that will help make switch statements exhaustive
 */
function assertNever(x: never): never {
  throw new TypeError(`Unexpected object: ${x}`);
}

/**
 * Returns a function that handles an `HttpError` by ignoring 404 errors and applying a given function `f` to the error.
 * For other types of errors, it rejects the error.
 *
 * @template A - The type of the value returned by the function `f`.
 * @param {function(HttpError): A} f - A function that takes an `HttpError` and returns a value of type `A`.
 * @returns {function(HttpError): Task<HttpError, A>} A function that takes an `HttpError` and returns a `Task` that resolves with the result of `f` if the error is a 404, or rejects with the error otherwise.
 */
export function ignore404With<A>(f: (e: HttpError) => A) {
  return (err: HttpError) =>
    new Task((reject: Reject<HttpError>, resolve: Resolve<A>) => {
      switch (err.kind) {
        case 'bad-url':
          reject(err);
          break;
        case 'timeout':
          reject(err);
          break;
        case 'network-error':
          reject(err);
          break;
        case 'bad-payload':
          reject(err);
          break;
        case 'bad-status':
          const response = err.response;
          response.status === 404 ? resolve(f(err)) : reject(err);
          break;
        default:
          assertNever(err);
      }
      return () => {};
    });
}
