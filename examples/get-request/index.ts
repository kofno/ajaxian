import { field, string } from 'jsonous';
import { Request, toHttpTask } from './../../src/index';
import Decoder from 'jsonous/Decoder';

const decoder: Decoder<string> = field('title', string);

const request: Request<string> = {
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  method: 'get',
  withCredentials: false,
  data: {},
  timeout: 0,
  headers: [],
  decoder: decoder.toJsonFn(),
};

toHttpTask(request).fork(e => console.error(e), data => console.log('Success:', data));
