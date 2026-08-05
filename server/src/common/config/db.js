import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../db/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Drizzle ORM v1 expects its node-postgres client in a config object. Passing
// `pool` directly makes Drizzle construct a second, unconfigured Pool, which
// defaults to localhost:5432.
export const db = drizzle({ client: pool, schema });

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
