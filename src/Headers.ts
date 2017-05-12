
/**
 * Parse response headers into an array of tuples
 */
export function parseHeaders(text: string): Array<[string, string]> {
  const makeTuple = (l: string[]) => [l[0] || '', l[1] || ''] as [string, string];
  return text.split('\r\n').map(s => s.split(':')).map(makeTuple);
}
