import { Exception } from "@odg/exception";

import { type RequestInterface } from "../interfaces/request";
import { type ResponseInterface } from "../interfaces/response";

export class MessageException<RequestData, ResponseData = unknown> extends Exception {

    // eslint-disable-next-line max-params
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
