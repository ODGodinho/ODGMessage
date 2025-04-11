import { Exception } from "@odg/exception";

import { type ResponseInterface, type RequestInterface } from "../interfaces";

import { MessageResponse } from "./MessageResponse";

export class MessageException<RequestData, ResponseData = unknown> extends Exception {

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: string,
        public request?: RequestInterface<RequestData>,
        public response?: ResponseInterface<ResponseData>,
    ) {
        super(message, preview, code);
    }

    public getMessage(): MessageResponse<RequestData, ResponseData> | undefined {
        if (!this.request || !this.response) return;

        return new MessageResponse(
            this.request,
            this.response,
        );
    }

}
