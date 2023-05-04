import * as redis from 'redis';
import {RedisClientType} from 'redis';
import {Logger} from '../logger';
import * as dotenv from 'dotenv';

dotenv.config();

export class Redis {
    private redisCache: RedisClientType;
    private logger: Logger;
    private exp: number;

    constructor(expiry: number) {
        this.logger = new Logger();
        this.exp = expiry;
        this.redisCache = redis.createClient({
            url: 'redis://redis:' + (process.env.REDIS_PORT || 6379)
        });
        this.redisCache.on('connect', () => this.logger.info('Redis Client Connected'));
        this.redisCache.on('error', err => this.logger.error('Redis Client Error: ' + err.message));
    }

    // Get function, takes a key (url) and a fetcher function to be used if cache is unable to provide the resource
    async get<T>(key: string, fn: () => Promise<T>): Promise<T> {

        // Connect to redis instance
        await this.redisCache.connect();

        // Disconnect and invoke fetcher function if redis isn't ready
        if (!this.redisCache.isReady) {
            this.logger.debug('Redis not ready');
            await this.redisCache.disconnect();
            return await fn();
        }

        const redisResponse = await this.redisCache.get(<any>key)
            .catch(async e => {
                this.logger.error('Redis get error: ' + e.message || JSON.stringify(e));
                await this.redisCache.disconnect();
                throw new Error(e);
            });

        if (redisResponse) {
            await this.redisCache.disconnect();
            this.logger.info('Serving resource from cache.');
            // if value is found in cache, return it
            return JSON.parse(redisResponse);
        } else {
            // else, run fetcher function
            this.logger.info('Value not found in cache, calling fetcher function');
            const result = await fn();
            // then save result in cache
            await this.redisCache.set(
                <any>key,
                <any>JSON.stringify(result),
                <any>{'EX': this.exp}
            ).catch(async e => {
                await this.redisCache.disconnect();
                this.logger.debug('Redis set error: ' + e.message || JSON.stringify(e));
                throw new Error(e);
            });
            // finally return result
            await this.redisCache.disconnect();
            return result;
        }
    }


}
