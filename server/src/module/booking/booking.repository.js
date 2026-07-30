import { eq, and, gt } from "drizzle-orm";
import { db } from "../../common/config/db.js";
import { seats } from "./booking.model.js";

/**
 * Get all seats ordered by creation date.
 */
export async function getAllSeats() {
  return db.select().from(seats).orderBy(seats.createdAt);
}

/**
 * Get a single seat by ID.
 */
export async function getSeatById(id) {
  const [seat] = await db
    .select()
    .from(seats)
    .where(eq(seats.id, id))
    .limit(1);
  return seat || null;
}

/**
 * Book a seat atomically — checks availability and marks as booked in one transaction.
 */
export async function bookSeat(seatId, userId) {
  return db.transaction(async (tx) => {
    // Lock the row and check availability
    const [seat] = await tx
      .select()
      .from(bookingSchema)
      .where(
        and(
          eq(bookingSchema.id, seatId),
          eq(bookingSchema.isBooked, false)
        )
      )
      .for("update")
      .limit(1);

    if (!seat) throw new Error("Seat is already booked or does not exist");

    const [updated] = await tx
      .update(bookingSchema)
      .set({ isBooked: true, userId })
      .where(eq(bookingSchema.id, seatId))
      .returning();

    return updated;
  });
}

/**
 * Seed N empty seats if none exist (idempotent).
 */
export async function seedSeatsIfEmpty(count = 20) {
  const existing = await db.select().from(bookingSchema).limit(1);
  if (existing.length > 0) return;

  const rows = Array.from({ length: count }, (_, i) => ({
    seatNumber: i + 1,
    isBooked: false,
    userId: null,
  }));
  await db.insert(bookingSchema).values(rows);
  console.log(`[Booking] Seeded ${count} seats.`);
}
