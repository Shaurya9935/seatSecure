import { and, eq, inArray } from "drizzle-orm";
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
 * Get all seats by their IDs
 */
export async function findSeatsByIds(seatIds) {
  return db
    .select()
    .from(seats)
    .where(inArray(seats.id, seatIds));
}

/**
 * Get ALL booked seat IDs for a show (used to render the seat map)
 */
export async function findAllBookedSeatsForShow(showId) {
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

/**
 * Get booked seats for a show filtered by specific seatIds
 * Used at booking-time to detect conflicts
 */
export async function findBookedSeats(showId, seatIds) {
  return db
    .select({
      seatId: bookingSeats.seatId,
    })
    .from(bookings)
    .innerJoin(
      bookingSeats,
      eq(bookings.id, bookingSeats.bookingId)
    )
    .where(
      and(
        eq(bookings.showId, showId),
        inArray(bookingSeats.seatId, seatIds)
      )
    );
}

/**
 * Create booking
 */
export async function createBooking(userId, showId, totalAmount) {
  const [booking] = await db
    .insert(bookings)
    .values({
      userId,
      showId,
      totalAmount,
    })
    .returning();

  return booking;
}

/**
 * Create booking_seats
 */
export async function createBookingSeats(bookingId, seatIds) {
  const values = seatIds.map((seatId) => ({
    bookingId,
    seatId,
  }));

  return db
    .insert(bookingSeats)
    .values(values)
    .returning();
}

export async function findSeatsByScreenId(screenId) {
  return db
    .select()
    .from(seats)
    .where(eq(seats.screenId, screenId));
}