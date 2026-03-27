import type { LookupAddress } from "node:dns";

import type { CacheInterface } from "@odg/cache";
import { Exception } from "@odg/exception";

import type { LookupCacheType, LookupKeyType } from "src";

import { CacheableLookup } from "../../src/messages/CacheableLookup";

function createCache(): {
    cache: CacheInterface<LookupCacheType & Record<string, unknown>>;
    store: LookupCacheType;
} {
    const store: LookupCacheType = {};
    const get = vi.fn(async (key: LookupKeyType) => store[key]);
    const set = vi.fn(async (key: LookupKeyType, value: LookupAddress | LookupAddress[]) => {
        store[key] = value;

        return true;
    });

    return {
        cache: {
            get,
            set,
        } as unknown as CacheInterface<LookupCacheType>,
        store,
    };
}

describe("CacheableLookup", () => {
    test("lookupAsync resolve single address e save cache", async () => {
        const { cache } = createCache();
        const lookup = new CacheableLookup(cache, {
            lookup: async (): Promise<LookupAddress> => ({
                address: "127.0.0.1",
                family: 4,
            }),
            maxTTl: 3000,
        });

        const resolved = await lookup.lookupAsync("example.com", { family: 4 });

        expect(Array.isArray(resolved)).toBeFalsy();
        expect(cache.set).toHaveBeenCalledTimes(1);
        expect(cache.set).toHaveBeenCalledWith(
            "dns:example.com:one:4:none:default",
            {
                address: "127.0.0.1",
                family: 4,
            },
            3000,
        );
    });

    test("lookupAsync return from the cache", async () => {
        const { cache } = createCache();
        const resolver = vi.fn(async () => ({
            address: "127.0.0.2",
            family: 4,
        }));
        const lookup = new CacheableLookup(cache, {
            lookup: resolver,
            maxTTl: 3000,
        });

        await lookup.lookupAsync("cache.test", { family: 4 });
        const resolved = await lookup.lookupAsync("cache.test", { family: 4 });

        expect(Array.isArray(resolved)).toBeFalsy();
        expect(cache.get).toHaveBeenCalledTimes(2);
        expect(cache.set).toHaveBeenCalledTimes(1);
        expect(resolver).toHaveBeenCalledTimes(1);
    });

    test("lookup working with callback simple address", async () => {
        const { cache } = createCache();
        const lookup = new CacheableLookup(cache, {
            lookup: async (): Promise<LookupAddress> => ({
                address: "127.0.0.3",
                family: 4,
            }),
        });

        await new Promise<void>((resolve) => {
            lookup.lookup("single.test", { family: 4 }, (error, address, family) => {
                expect(error).toBeNull();
                expect(address).toBe("127.0.0.3");
                expect(family).toBe(4);
                resolve();
            });
        });
    });

    test("lookup working with callback array of addresses", async () => {
        const { cache } = createCache();
        const addresses: LookupAddress[] = [
            {
                address: "127.0.0.4",
                family: 4,
            },
        ];
        const lookup = new CacheableLookup(cache, {
            lookup: async (): Promise<LookupAddress[]> => addresses,
        });

        await new Promise<void>((resolve) => {
            lookup.lookup("array.test", { all: true }, (error, address, family) => {
                expect(error).toBeNull();
                expect(address).toStrictEqual(addresses);
                expect(family).toBeUndefined();
                resolve();
            });
        });
    });

    test("setUseCache e setSetCache disable read/write cache", async () => {
        const { cache } = createCache();
        const resolver = vi.fn(async (): Promise<LookupAddress> => ({
            address: "127.0.0.5",
            family: 4,
        }));
        const lookup = new CacheableLookup(cache, {
            lookup: resolver,
        });

        lookup.setUseCache(false).setSetCache(false);
        await lookup.lookupAsync("no-cache.test", { family: 4 });

        expect(cache.get).not.toHaveBeenCalled();
        expect(cache.set).not.toHaveBeenCalled();
        expect(resolver).toHaveBeenCalledTimes(1);
    });

    test("lookup callback with error", async () => {
        const { cache } = createCache();
        const lookupError: Error = {
            message: "dns fail",
            name: "LookupError",
        };
        const lookup = new CacheableLookup(cache, {
            lookup: async (): Promise<LookupAddress> => {
                throw lookupError;
            },
        });

        await new Promise<void>((resolve) => {
            lookup.lookup("error.test", { family: 4 }, (error, address, family) => {
                expect(error).toBe(lookupError);
                expect(address).toBe("");
                expect(family).toBeUndefined();
                resolve();
            });
        });
    });

    test("lookupAsync with cache cache and config without lookup custom", async () => {
        const { cache, store } = createCache();

        store["dns:cached-host:one:4:none:default"] = {
            address: "127.0.0.6",
            family: 4,
        };

        const lookup = new CacheableLookup(cache, {
            maxTTl: 3000,
        });

        const resolved = await lookup.lookupAsync("cached-host", { family: 4 });

        expect(Array.isArray(resolved)).toBeFalsy();
        expect((resolved as LookupAddress).address).toBe("127.0.0.6");
    });

    test("lookupAsync resolve cache.get with other attempt failed", async () => {
        const { cache } = createCache();

        cache.get = vi.fn(async () => Promise.reject(
            new Exception("cache get fail"),
        ));

        const resolver = vi.fn(async (): Promise<LookupAddress> => ({
            address: "127.0.0.7",
            family: 4,
        }));
        const lookup = new CacheableLookup(cache, {
            lookup: resolver,
            maxTTl: 2000,
        });

        const resolved = await lookup.lookupAsync("get-fail.test", { family: 4 });

        expect((resolved as LookupAddress).address).toBe("127.0.0.7");
        expect(resolver).toHaveBeenCalledTimes(1);
        expect(cache.set).toHaveBeenCalledTimes(1);
    });

    test("lookupAsync working if cache.set failed", async () => {
        const { cache } = createCache();

        cache.set = vi.fn(async () => Promise.reject(new Exception("cache set fail")));

        const resolver = vi.fn(async (): Promise<LookupAddress> => ({
            address: "127.0.0.8",
            family: 4,
        }));
        const lookup = new CacheableLookup(cache, {
            lookup: resolver,
            maxTTl: 2000,
        });

        const resolved = await lookup.lookupAsync("set-fail.test", { family: 4 });

        expect((resolved as LookupAddress).address).toBe("127.0.0.8");
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});
