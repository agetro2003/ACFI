import pg from 'pg';
import 'dotenv/config';
const { Pool } = pg;

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});
 

export default pool;