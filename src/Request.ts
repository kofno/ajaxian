import { Result } from 'resulty';

export type DecoderFn<A> = (json: string) => Result<string, A>;

export type Method
  = 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'head'
  | 'options'
  | 'delete'
  ;

export interface Request<A> {
  url: string;
  method: Method;
  data: any;
  timeout: number;
  headers: Array<[string, string]>;
  withCredentials: boolean;
  decoder: DecoderFn<A>;
}

export default Request;
