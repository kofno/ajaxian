import { afterAll, describe, expect, test } from 'bun:test';
import { err, ok } from 'resulty';
import { toHttpResponseTask } from '../src';
import { toHttpTask } from './../src/Http';
import { Method, Request } from './../src/Request';
import { get } from './../src/RequestBuilder';

const aGetRequest: Request<string> = {
  method: 'get' as Method,
  url: 'http://localhost:9876',
  data: {},
  timeout: 0,
  headers: [],
  withCredentials: false,
  decoder: () => ok('foo'),
};

const aFailedGetRequest = {
  method: 'get' as Method,
  url: 'http://localhost:9876',
  data: {},
  timeout: 0,
  headers: [],
  withCredentials: false,
  decoder: () => err('Bad mojo'),
};

const mockServer = Bun.serve({
  port: 9876,
  async fetch(req) {
    return new Response(
      JSON.stringify({
        data: 'foo',
      }),
      {
        headers: {
          'content-type': 'application/json',
          foo: 'bar',
        },
      },
    );
  },
});

afterAll(async () => {
  await mockServer.stop();
});

describe('toHttpResponseTask', () => {
  test('can get the headers from a request', async () => {
    const result = await toHttpResponseTask(aGetRequest).resolve();
    expect(result.response.headers.length).toBeGreaterThan(0);
  });
});

describe('toHttpTask', () => {
  test('can get data from websites', async () => {
    const result = await toHttpTask(aGetRequest).resolve();
    expect(result).toEqual('foo');
  });

  test('handle failed decoder errors', async () => {
    try {
      await toHttpTask(aFailedGetRequest).resolve();
      throw new Error('should not have resolved');
    } catch (e) {
      expect(e).toHaveProperty('kind', 'bad-payload');
      expect(e).toHaveProperty('message', 'Bad mojo');
    }
  });
});

describe('using the request builder', () => {
  test('can be used in place of a request', async () => {
    const result = await toHttpTask(get('http://localhost:9876')).resolve();
  });
});
