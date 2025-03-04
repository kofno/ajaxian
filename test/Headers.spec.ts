import { describe, expect, test } from 'bun:test';
import { parseHeaders } from './../src/Headers';

const exampleHeaders = 'foo:bar\r\nbaz:boom';

describe('parsing headers', () => {
  test('produces an array of tuples', () => {
    expect(parseHeaders(exampleHeaders)).toEqual([
      { field: 'foo', value: 'bar' },
      { field: 'baz', value: 'boom' },
    ]);
  });
});
