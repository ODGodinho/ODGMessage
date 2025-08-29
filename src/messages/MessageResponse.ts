import { type RequestInterface, type ResponseInterface } from "../interfaces";

/**
 * @template {unknown} ResponseData
 * @template {unknown} RequestData
 */
export class MessageResponse<RequestData = unknown, ResponseData = unknown> {

    protected readonly IS_ODG_MESSAGE_RESPONSE: boolean = true;

    public constructor(
        public request: RequestInterface<RequestData>,
        public response: ResponseInterface<ResponseData>,
    ) {
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
