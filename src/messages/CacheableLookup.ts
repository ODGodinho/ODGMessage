import type {
    LookupOptions,
} from "node:dns";
import {
    lookup as dnsLookup,
} from "node:dns/promises";
import type { LookupFunction } from "node:net";

import type { CacheInterface } from "@odg/cache";

import type {
    CacheableLookupConfig,
    LookupCacheType,
    LookupKeyType,
    LookupPromiseResult,
} from "../interfaces";

export class CacheableLookup {

    private readonly resolver: (hostname: string, options: LookupOptions) => Promise<LookupPromiseResult>;

    private readonly maxTTl: number;

    private setCache: boolean;

    private useCache: boolean;

    public constructor(
        private readonly cache: CacheInterface<LookupCacheType>,
        config?: CacheableLookupConfig,
    ) {
        this.resolver = config?.lookup?.bind(this) ?? dnsLookup;

        this.useCache = config?.useCache ?? true;
        this.setCache = config?.setCache ?? true;
        this.maxTTl = config?.maxTTl ?? Infinity;
    }

    public setUseCache(useCache: boolean): this {
        this.useCache = useCache;

        return this;
    }

    public setSetCache(setCache: boolean): this {
        this.setCache = setCache;

        return this;
    }

    public lookup(...lookupParamers: Parameters<LookupFunction>): void {
        const [ hostname, options, callback ] = lookupParamers;

        this.lookupAsync(hostname, options)
            .then((resolved) => {
                this.callLookupCallback(callback, resolved);

                return resolved;
            })
            .catch((error: Error) => {
                this.callLookupErrorCallback(callback, error);
            });
    }

    public async lookupAsync(
        hostname: string,
        options: LookupOptions,
    ): Promise<LookupPromiseResult> {
        const cacheKey = this.makeCacheKey(hostname, options);

        if (this.useCache) {
            const cached = await this.cache.get(cacheKey).catch(() => undefined);

            if (cached) return cached;
        }

        const resolved = await this.resolver(hostname, options);

        if (this.setCache) {
            void this.cache.set(cacheKey, resolved, this.maxTTl).catch(() => false);
        }

        return resolved;
    }

    private callLookupCallback(
        callback: Parameters<LookupFunction>["2"],
        resolved: LookupPromiseResult,
    ): void {
        if (Array.isArray(resolved)) {
            callback(null, resolved);

            return;
        }

        callback(null, resolved.address, resolved.family);
    }

    private callLookupErrorCallback(
        callback: Parameters<LookupFunction>["2"],
        error: Error,
    ): void {
        callback(error, "");
    }

    private makeCacheKey(hostname: string, options: LookupOptions): LookupKeyType {
        const all = options.all ? "all" : "one";
        const family = options.family ?? "any";
        const hints = options.hints ?? "none";
        const order = options.order ?? "default";

        return `dns:${hostname}:${all}:${family}:${hints}:${order}`;
    }

}
