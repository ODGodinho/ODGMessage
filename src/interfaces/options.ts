/**
 * Http Status Methods
 *
 * @enum {string}
 */
export enum Methods {
    "GET" = "get",
    "POST" = "post",
    "PUT" = "put",
    "PATCH" = "patch",
    "HEAD" = "head",
    "DELETE" = "delete",
    "OPTIONS" = "options",
    "TRACE" = "trace",
}

/**
 * Proxy interface for requests
 */
export interface ProxyConfigInterface {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
}
