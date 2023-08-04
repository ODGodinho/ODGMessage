import { UnknownException } from "@odg/exception";

import { type RequestInterface } from "../interfaces/request";
import { type ResponseInterface } from "../interfaces/response";

export class MessageUnknownException<RequestData, ResponseData = unknown> extends UnknownException {

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: string,
        public request?: RequestInterface<RequestData>,
        public response?: ResponseInterface<RequestData, ResponseData>,
    ) {
        super(message, preview, code);
    }

}
