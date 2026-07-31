import ApiError from "../../common/utils/api-error.js";
import { getAllSeats, bookSeat, getShowById } from "./booking.repository.js";

export const getShowService = async (showId) => {
    const seat = await getShowById(showId)
    console.log(seat)
  if(!seat){
    throw ApiError.notFound("Seat not found")
  }
  return{
    title: "working seats route"
  }
};

export const bookSeatService = async (seatId, userId) => {
  try {
    return await bookSeat(seatId, userId);
  } catch (err) {
    throw ApiError.conflict(err.message || "Seat already booked");
  }
};
