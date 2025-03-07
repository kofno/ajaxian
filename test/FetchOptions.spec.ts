import { describe, expect, test } from 'bun:test';
import { ok } from 'resulty';
import { fetchOptions, Request } from '../src';

const aGetRequest: Request<string> = {
  method: 'get',
  url: 'http://localhost:9876',
  data: {},
  timeout: 0,
  headers: [{ field: 'Content-Type', value: 'application/json' }],
  withCredentials: false,
  decoder: () => ok('foo'),
};

const aPostRequest: Request<string> = {
  method: 'post',
  url: 'http://localhost:9876',
  data: { message: 'Hello' },
  timeout: 0,
  headers: [{ field: 'Content-Type', value: 'application/json' }],
  withCredentials: false,
  decoder: () => ok('foo'),
};

const aPutRequest: Request<string> = {
  method: 'put',
  url: 'http://localhost:9876',
  data: { message: 'Hello' },
  timeout: 0,
  headers: [{ field: 'Content-Type', value: 'application/json' }],
  withCredentials: false,
  decoder: () => ok('foo'),
};

describe('fetchOptions', () => {
  test('should build correct fetch options for GET', () => {
    const options = fetchOptions(aGetRequest);
    expect(options.method).toBe('get');
    expect(options.body).toBeNull();
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(options.credentials).toBe('same-origin');
    expect(options.mode).toBe('cors');
  });

  test('should build correct fetch options for POST', () => {
    const options = fetchOptions(aPostRequest);
    expect(options.method).toBe('post');
    expect(options.body).toBe(JSON.stringify({ message: 'Hello' }));
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(options.credentials).toBe('same-origin');
    expect(options.mode).toBe('cors');
  });

  test('should include credentials when withCredentials is true', () => {
    const request: Request<string> = {
      ...aGetRequest,
      withCredentials: true,
    };
    const options = fetchOptions(request);
    expect(options.credentials).toBe('include');
  });

  test('should build correct fetch options for PUT', () => {
    const options = fetchOptions(aPutRequest);
    expect(options.method).toBe('put');
    expect(options.body).toBe(JSON.stringify({ message: 'Hello' }));
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(options.credentials).toBe('same-origin');
    expect(options.mode).toBe('cors');
  });

  test('should handle string data correctly', () => {
    const request: Request<string> = {
      ...aPostRequest,
      data: 'some string data',
    };
    const options = fetchOptions(request);
    expect(options.body).toBe(request.data);
  });
});
