import { UnknownException } from "@odg/exception";

import { type RequestInterface, type ResponseInterface } from "../interfaces";

export class MessageUnknownException<RequestData, ResponseData = unknown> extends UnknownException {

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: string,
        public request?: RequestInterface<RequestData>,
        public response?: ResponseInterface<ResponseData>,
    ) {
        super(message, preview, code);
    }

}
