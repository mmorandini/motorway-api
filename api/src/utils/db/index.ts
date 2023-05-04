import {Pool, PoolClient} from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export class Database {

    // Establish db connection
    connect(): Promise<PoolClient> {
        const pool = this.initPool();
        return pool.connect();
    }

    initPool(): Pool {
        return new Pool({
            host: 'db',
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432')
        })
    }


}
