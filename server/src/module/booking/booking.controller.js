import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import { bookSeatService, getShowService } from "./booking.service.js";

const getSeats = async (req, res) => {
  const { showId } = req.params
  const seats = await getShowService(showId);
  ApiResponse.ok(res, "Seats fetched", seats);
};

const bookSeat = async (req, res) => {
  // seatId is now a UUID string, not a numeric id
  const seatId = req.params.id?.trim();

  if (!seatId) {
    throw ApiError.badRequest("Invalid seat id");
  }

  // userId comes from the authenticated user (or body for legacy compat)
  const userId = req.user?.id || req.body?.userId;

  if (!userId) {
    throw ApiError.unauthorized("You must be logged in to book a seat");
  }

  const result = await bookSeatService(seatId, userId);
  ApiResponse.ok(res, "Seat booked", result);
};

export { getSeats, bookSeat };