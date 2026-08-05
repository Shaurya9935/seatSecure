import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";
import * as schema from "../../db/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
console.log(process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, { schema });

const connectDB = async () => {
  try {
    const client = await pool.connect();

    await client.query("SELECT 1");

    client.release();

    console.log("PostgreSQL connected Successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default connectDB;