import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const connectDB = async () => {
    if (!process.env.DATABASE_URL) {
        console.warn("DATABASE_URL is not set. Skipping DB connection.");
        return null;
    }

    const db = drizzle(process.env.DATABASE_URL);
    console.log(`Database connected: ${conn.connection.host}`)
}

export default connectDB;



