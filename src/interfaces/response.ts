import { type HttpHeadersInterface } from "./headers";
import { type RequestInterface } from "./request";

export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "stream" | "text";

export interface ResponseInterface<RequestData, ResponseData> {
    data: ResponseData;
    status: number;
    headers: HttpHeadersInterface;
    request: RequestInterface<RequestData>;
}
