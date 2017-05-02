
/**
 * Parse response headers into an array of arrays
 */
export function parseHeaders(text: string) {
  return text.split('\r\n').map(s => s.split(':'));
}
