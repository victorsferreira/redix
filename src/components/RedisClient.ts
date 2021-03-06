const redis = (window as any).require('redis');

export class RedisClientError extends Error {}

export class RedisClient {
    private client: any;

    constructor() {

    }

    connect(config: any = {}) {
        if (this.client) {
            // Disconnect if it is already connected
            this.client.end();
        }

        const { host, port, username, password } = config;

        console.log("Redis will connect", config.name);

        return new Promise((resolve, reject) => {
            this.client = redis.createClient({
                host, port, username, password,
                retry_strategy: (options) => {
                    if (options.error) {
                        return new RedisClientError(options.error);
                    }

                    return false;
                }
            });

            this.client.on("error", function (error) {
                reject(error);
            });

            this.client.on("connect", function (error) {
                resolve();
            });
        })
    }

    disconnect() {
        if (this.client) this.client.end();
    }

    getAll(): Promise<any> {
        console.log("Executing GetAll");
        return new Promise((resolve, reject) => {
            this.client.keys('*', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    flushAll(): Promise<any> {
        console.log("Executing FlushAll");
        return new Promise((resolve, reject) => {
            this.client.flushdb((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    get(key): Promise<any> {
        console.log(`Executing Get: Key [${key}]`);
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                console.log("get", data)
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    delete(key): Promise<any> {
        console.log(`Executing Delete: Key [${key}]`);
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    getByPattern(pattern): Promise<any> {
        console.log(`Executing Pattern: pattern [${pattern}]`);
        return new Promise((resolve, reject) => {
            this.client.keys(`*${pattern}*`, (err, data) => {
                console.log("get pattern", data)
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    set(key, value): Promise<any> {
        console.log(`Executing Set: Key [${key}] value [${value}]`);
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, data) => {
                console.log("set", data)
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

const client = new RedisClient();

export { client };