const redis: any = {};
// import * as redis from 'redis;'

export class RedisClient {
    private redis: any;

    constructor() {

    }

    async connect(config) {
        return true;
        if (this.redis) {
            // Disconnect if it is already connected
            this.redis.end();
        }

        const { host, port, username, password } = config;
        this.redis = await redis.createClient({
            host, port, username, password
        });

        console.log("Redis has connected");
    }

    flushAll() {
        return true;

        return this.redis.flushAll();
    }

    get(key) {
        return JSON.stringify({ name: "Victor", country: "br" });
        return this.redis.get(key);
    }

    delete(key) {
        return this.redis.del(key);
    }

    getByPattern(pattern) {
        const keys = [
            "Victor",
            "John",
            "Fernando",
            "Lee",
        ];

        return keys;

        this.redis.keys(`*${pattern}*`);
    }

    set(key, value) {
        return true;
        return this.redis.set(key, value);
    }
}

const client = new RedisClient();

export { client };