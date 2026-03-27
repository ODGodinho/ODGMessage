import type { Agent as HttpAgent } from "node:http";
import type { Agent as HttpsAgent } from "node:https";
import type { LookupFunction } from "node:net";

import type { Methods } from "../MethodsEnum";

import type { HttpHeadersInterface } from "./headers";
import type { ProxyConfigInterface } from "./options";
import type { ResponseType } from "./response";

export interface ParametersInterface extends Record<string, unknown> {

}

export interface RequestInterface<RequestData, ExtraData extends Record<string, unknown> = Record<string, unknown>> {
    readonly startTime?: number;
    readonly endTime?: number;
    readonly timestamps?: number;
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
    signal?: AbortSignal;
    httpAgent?: HttpAgent;
    httpsAgent?: HttpsAgent;
    lookup?: LookupFunction;
    extras?: ExtraData;
}

export type RequestOptionsParametersInterface<
    RequestData,
    ExtraData extends Record<string, unknown> = Record<string, unknown>,
> = Omit<
    RequestInterface<RequestData, ExtraData>,
    "endTime" | "startTime" | "timestamps"
>;
