/**
 * The response from an ajax request
 */
export interface AjaxResponse {
    body: string;
    status: number;
    statusText: string;
    headers: string[][];
}
export default AjaxResponse;
