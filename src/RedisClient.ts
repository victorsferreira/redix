// const redis: any = {};
import * as loader from './loader';
const redis = loader.get('redis');

export class RedisClient {
    private redis: any;

    constructor() {
        console.log("CRIOU OUTRA")

    }

    async connect(config: any = {}) {
        if (this.redis) {
            // Disconnect if it is already connected
            this.redis.end();
        }

        const { host, port, username, password } = config;
        this.redis = await redis.createClient({
            host, port, username, password,
            retry_strategy: (options) => {
                if (options.error) {
                    alert(`ERROR: ${options.error.code}`);
                }

                return false;
            }
        });

        console.log("Redis has connected");
    }

    flushAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.flushdb((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    get(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.get(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    delete(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.del(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    getByPattern(pattern): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.keys(`*${pattern}*`, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    set(key, value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.redis.set(key, value, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

const client = new RedisClient();

export { client };