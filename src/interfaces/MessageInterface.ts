import { type RequestInterface } from "./request";
import { type ResponseInterface } from "./response";

export type onFulfilledType<Data> = (value: Data) => Data | Promise<Data>;

export type onRejectedType = (error: Error) => never;

export interface MessageInterceptorOptions {
    synchronous?: boolean;
}

export interface InterceptorManager<RequestOrResponseInterface> {
    use(
        onFulfilled?: onFulfilledType<RequestOrResponseInterface>,
        onRejected?: onRejectedType,
        options?: MessageInterceptorOptions
    ): number;
    eject(id: number): void;
    clear(): void;
}

export type DefaultMessageConstructor<RequestData> = Omit<RequestInterface<RequestData>, "headers">;

export interface MessageInterface<RequestData = unknown, ResponseData = unknown> {

    interceptors: {
        request: InterceptorManager<RequestInterface<RequestData>>;
        response: InterceptorManager<ResponseInterface<RequestData, ResponseData>>;
    };

    request<RequestD = RequestData, ResponseD = ResponseData>(
        config: RequestInterface<RequestD>
    ): Promise<ResponseInterface<RequestD, ResponseD>>;

}
