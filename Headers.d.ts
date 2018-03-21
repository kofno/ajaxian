export interface Header {
    field: string;
    value: string;
}
export declare const header: (field: string, value: string) => Header;
/**
 * Parse response headers into an array of tuples
 */
export declare function parseHeaders(text: string): Header[];
