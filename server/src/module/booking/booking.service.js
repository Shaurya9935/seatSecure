import ApiError from "../../common/utils/api-error.js";
import { getAllSeats, getSeatById, bookSeat } from "./booking.repository.js";

export const getSeatsService = async () => {
  return getAllSeats();
};

export const bookSeatService = async (seatId, userId) => {
  try {
    return await bookSeat(seatId, userId);
  } catch (err) {
    throw ApiError.conflict(err.message || "Seat already booked");
  }
};
