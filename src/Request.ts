import { Result } from "resulty";

export type DecoderFn<A> = (json: string) => Result<string, A>;

export type Method =
  | "get"
  | "GET"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "delete"
  | "DELETE";

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
