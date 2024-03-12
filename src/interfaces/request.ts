import { type HttpHeadersInterface } from "./headers";
import { type Methods, type ProxyConfigInterface } from "./options";
import { type ResponseType } from "./response";

export interface ParametersInterface extends Record<string, unknown> {

}

export interface RequestInterface<RequestData> {
    url?: string;
    baseURL?: string;
    method?: Methods | string;
    headers?: HttpHeadersInterface;
    params?: ParametersInterface;
    data?: RequestData;
    timeout?: number;
    responseType?: ResponseType;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    proxy?: ProxyConfigInterface | false;

    // TODO: cancelToken?: any;
}
