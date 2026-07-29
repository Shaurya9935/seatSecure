import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";
import * as schema from "../../db/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

const connectDB = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("PostgreSQL connected Successfully");
  } catch (error) {
    console.error(" Database connection failed");
    throw error;
  }
};

export default connectDB;