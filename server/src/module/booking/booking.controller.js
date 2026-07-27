import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import { bookSeatService, getSeatsService } from "./booking.service.js";

const getSeats = async (req, res) => {
    const seats = await getSeatsService();
    ApiResponse.ok(res, "Seats fetched", seats);
};

const bookSeat = async (req, res) => {
    const seatId = Number(req.params.id);
    const name = req.body?.name?.trim();

    if (!Number.isInteger(seatId) || seatId <= 0) {
        throw ApiError.badRequest("Invalid seat id");
    }

    if (!name) {
        throw ApiError.badRequest("Name is required to book a seat");
    }

    const result = await bookSeatService(seatId, name);
    ApiResponse.ok(res, "Seat booked", result);
};

export { getSeats, bookSeat };