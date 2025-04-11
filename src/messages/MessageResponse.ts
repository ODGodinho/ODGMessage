import { type HttpHeadersInterface, type RequestInterface, type ResponseInterface } from "../interfaces";

/**
 * @template {unknown} ResponseData
 * @template {unknown} RequestData
 */
export class MessageResponse<RequestData = unknown, ResponseData = unknown> {

    /** @deprecated Use message.response.data */
    public readonly data: ResponseData | undefined;

    /** @deprecated Use message.response.status */
    public readonly status: number | undefined;

    /** @deprecated Use message.response.headers */
    public readonly headers: HttpHeadersInterface | undefined;

    protected readonly IS_ODG_MESSAGE_RESPONSE: boolean = true;

    public constructor(
        public request: RequestInterface<RequestData>,
        public response: ResponseInterface<ResponseData>,
    ) {
        this.data = this.response.data;
        this.status = this.response.status;
        this.headers = this.response.headers;
    }

    public static isMessageResponse(
        message: unknown,
    ): message is MessageResponse {
        if (!message) return false;

        if (message instanceof MessageResponse) return true;

        const isMessageResponseField = "IS_ODG_MESSAGE_RESPONSE";

        return typeof message === "object"
            && isMessageResponseField in message
            && "request" in message
            && "response" in message
            && !!message[isMessageResponseField];
    }

    public getMessage(): this {
        return this;
    }

    /**
     * Truthy if valid status in message.request.validadeStatus(message.getStatus())
     *
     * @returns {boolean}
     */
    public isOk(): boolean {
        return this.request.validateStatus!(this.response.status);
    }

    /**
     * Get response status
     *
     * @returns {number}
     */
    public getStatus(): number {
        return this.response.status;
    }

    /**
     * Get response body
     *
     * @returns {ResponseData}
     */
    public getResponseBody(): ResponseData {
        return this.response.data;
    }

}
