import { eq } from "drizzle-orm";
import { db } from "../../common/config/db.js";

import {
  bookings,
  bookingSeats,
  seats,
} from "./booking.model.js";

import { shows } from "../movie/movie.model.js";

/**
 * Find a show by its ID
 */
export async function findShowById(showId) {
  const [show] = await db
    .select()
    .from(shows)
    .where(eq(shows.id, showId))
    .limit(1);

  return show ?? null;
}

/**
 * Get every seat of a screen
 */
export async function findSeatsByScreenId(screenId) {
  return db
    .select()
    .from(seats)
    .where(eq(seats.screenId, screenId));
}

/**
 * Get all booked seats for a particular show
 */
export async function findBookedSeats(showId) {
  return db
    .select({
      seatId: bookingSeats.seatId,
    })
    .from(bookings)
    .innerJoin(
      bookingSeats,
      eq(bookings.id, bookingSeats.bookingId)
    )
    .where(eq(bookings.showId, showId));
}