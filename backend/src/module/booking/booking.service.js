import pg from "pg";
import ApiError from "../../common/utils/api-error.js";

const pool = new pg.Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5433),
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "sql_class_2_db",
  max: 20,
});

const getSeatsService = async () => {
  const result = await pool.query(
    "SELECT id, name, isbooked FROM seats ORDER BY id ASC"
  );
  return result.rows;
};

const bookSeatService = async (seatId, name) => {
  const conn = await pool.connect();
  try {
    await conn.query("BEGIN");

    const selectQuery =
      "SELECT id FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE";
    const seat = await conn.query(selectQuery, [seatId]);

    if (seat.rowCount === 0) {
      throw ApiError.conflict("Seat already booked");
    }

    const updateQuery =
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1 RETURNING id, name, isbooked";
    const updateResult = await conn.query(updateQuery, [seatId, name]);

    await conn.query("COMMIT");
    return updateResult.rows[0];
  } catch (error) {
    await conn.query("ROLLBACK");
    throw error;
  } finally {
    conn.release();
  }
};

export { getSeatsService, bookSeatService };
