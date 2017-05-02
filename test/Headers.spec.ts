import { parseHeaders } from './../src/Headers';

const exampleHeaders = 'foo:bar\r\nbaz:boom';

describe('parsing headers', () => {
  it('produces an array of tuples', () => {
    expect(parseHeaders(exampleHeaders))
      .toEqual([['foo', 'bar'], ['baz', 'boom']]);
  });
});
