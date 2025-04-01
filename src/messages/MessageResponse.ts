import { type HttpHeadersInterface, type RequestInterface, type ResponseInterface } from "../interfaces";

export class MessageResponse<RequestData = unknown, ResponseData = unknown> {

    /** @deprecated Use message.response.data */
    public readonly data: ResponseData | undefined;

    /** @deprecated Use message.response.status */
    public readonly status: number | undefined;

    /** @deprecated Use message.response.headers */
    public readonly headers: HttpHeadersInterface | undefined;

    public constructor(
        public request: RequestInterface<RequestData>,
        public response: ResponseInterface<ResponseData>,
    ) {
        this.data = this.response.data;
        this.status = this.response.status;
        this.headers = this.response.headers;
    }

    public isOk(): boolean {
        return this.request.validateStatus!(this.response.status);
    }

}
