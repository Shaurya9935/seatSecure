import ApiError from "../../common/utils/api-error.js";

import {
  findShowById,
  findSeatsByScreenId,
  findBookedSeats,
} from "./booking.repository.js";

const getSeatsService = async (showId) => {
  const show = await findShowById(showId);

  if (!show) {
    throw ApiError.notFound("Show not found");
  }

  const seats = await findSeatsByScreenId(show.screenId);
  if(!seats){
    throw ApiError.notFound("Seats not found")
  }

  const bookedSeats = await findBookedSeats(showId);

  if(!bookedSeats){
    throw ApiError.notFound("Booked Seats not found")
  }

  const bookedSeatIds = new Set(bookedSeats.map((seat) => seat.seatId));
  if(!bookedSeatIds){
    throw ApiError.notFound("Booked Seat Ids not found")
  }

  const seatLayout = seats.map((seat) => ({
    id: seat.id,
    row: seat.row,
    number: seat.number,
    isBooked: bookedSeatIds.has(seat.id),
  }));

  return seatLayout;
};

export { getSeatsService }