const redis = (window as any).require('redis');

export class RedisClient {
    private client: any;

    constructor() {

    }

    async connect(config: any = {}) {
        if (this.client) {
            // Disconnect if it is already connected
            this.client.end();
        }

        const { host, port, username, password } = config;
        this.client = await redis.createClient({
            host, port, username, password,
            retry_strategy: (options) => {
                if (options.error) {
                    alert(`ERROR: ${options.error.code}`);
                }

                return false;
            }
        });

        console.log("Redis has connected", config.name);
    }

    disconnect(){
        if(this.client) this.client.end();
    }

    flushAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.flushdb((err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    get(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                console.log("get", data)
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    delete(key): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    getByPattern(pattern): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.keys(`*${pattern}*`, (err, data) => {
                console.log("get pattern", data)
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    set(key, value): Promise<any> {
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