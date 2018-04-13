import AjaxResponse from './AjaxResponse';
import Result from 'resulty/Result';
import { HttpError } from './HttpError';

export interface HttpSuccess<A> {
  response: AjaxResponse;
  result: A;
}

export const httpSuccess = <A>(response: AjaxResponse, result: A): HttpSuccess<A> =>
  ({ response, result });
