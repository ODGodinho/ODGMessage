/**
 * Proxy interface for requests
 */
export interface ProxyConfigInterface {
    host: string;
    port?: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
}
