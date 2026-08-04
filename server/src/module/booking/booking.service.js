import ApiError from "../../common/utils/api-error.js";

import {
  findShowById,
  findSeatsByScreenId,
  findAllBookedSeatsForShow,
  findBookedSeats,
  createBooking,
  createBookingSeats,
  findSeatsByIds,
} from "./booking.repository.js";

export async function getSeatsService(showId) {
  const show = await findShowById(showId);

  if (!show) {
    throw ApiError.notFound("Show not found");
  }

  const seats = await findSeatsByScreenId(show.screenId);
  const bookedSeats = await findAllBookedSeatsForShow(showId);
  const bookedSeatIds = new Set(bookedSeats.map((seat) => seat.seatId));

  return seats.map((seat) => ({
    id: seat.id,
    row: seat.row,
    number: seat.number,
    isBooked: bookedSeatIds.has(seat.id),
  }));
}

export async function createBookingService(
  userId,
  showId,
  seatIds,
) {
  // 1. Check show exists

  const show = await findShowById(showId);

  if (!show) {
    throw ApiError.notFound("Show not found");
  }

  // 2. Get requested seats

  const seats = await findSeatsByIds(seatIds);

  // 3. Ensure every requested seat exists

  if (seats.length !== seatIds.length) {
    throw ApiError.badRequest("One or more seats are invalid");
  }

  // 4. Ensure seats belong to this screen

  const invalidSeat = seats.find((seat) => seat.screenId !== show.screenId);

  if (invalidSeat) {
    throw ApiError.badRequest("Some seats do not belong to this show");
  }

  // 5. Check already booked seats

  const bookedSeats = await findBookedSeats(showId, seatIds);

  if (bookedSeats.length > 0) {
    throw ApiError.conflict("Some seats are already booked");
  }

  // 6. Calculate amount

  const totalAmount = seats.length * show.price;

  // 7. Create booking

  const booking = await createBooking(
    userId,
    showId,
    totalAmount,
  );

  // 8. Create booking_seats

  await createBookingSeats(
    booking.id,
    seatIds,
  );

  return booking;
}
