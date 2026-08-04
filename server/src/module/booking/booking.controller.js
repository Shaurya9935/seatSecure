import ApiResponse from "../../common/utils/api-response.js";
import { getSeatsService, createBookingService } from "./booking.service.js";

const getSeats = async (req, res) => {
  const { showId } = req.params;

  const seats = await getSeatsService(showId);

  ApiResponse.ok(res, "Seats fetched", seats);
};

const bookSeats = async (req, res) => {
  const { showId, seatIds } = req.body;
  const userId = req.user.id;
  const booking = await createBookingService(
    userId,
    showId,
    seatIds
  );

  ApiResponse.created(res,"Booking created successfully",booking);

};

export { getSeats, bookSeats };