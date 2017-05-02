import { err, ok } from 'resulty';
import { toHttpTask } from './../src/Http';
import { Method } from './../src/Request';
import { getString } from './../src/RequestBuilder';

const aGetRequest = {
  method: 'get' as Method,
  url: 'http://localhost:9876',
  data: {},
  timeout: 0,
  headers: [] as string[][],
  withCredentials: false,
  decoder: () => ok({}),
};

const aFailedGetRequest = {
  method: 'get' as Method,
  url: 'http://localhost:9876',
  data: {},
  timeout: 0,
  headers: [] as string[][],
  withCredentials: false,
  decoder: () => err('Bad mojo'),
};

describe('toHttpTask', () => {
  it('can get data from websites', done => {
    toHttpTask(aGetRequest).fork(
      err => done.fail(`Should have succeeded: ${JSON.stringify(err)}`),
      () => done(),
    );
  });

  it('handle failed decoder errors', done => {
    toHttpTask(aFailedGetRequest).fork(
      err => done(),
      () => done.fail('Should not have succeeded'),
    );
  });
});

describe('using the request builder', () => {
  it('can be ised in place of a request', done => {
    toHttpTask(getString('/')).fork(
      err => done.fail(`Should have succeeded: ${JSON.stringify(err)}`),
      () => done(),
    );
  });
});
