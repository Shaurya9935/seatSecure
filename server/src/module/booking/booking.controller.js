import ApiResponse from "../../common/utils/api-response.js";
import { getSeatsService } from "./booking.service.js";

const getSeats = async (req, res) => {
  const { showId } = req.params;

  const seats = await getSeatsService(showId);

  ApiResponse.ok(res, "Seats fetched", seats);
};

const bookSeats = async (req, res) => {
  const { showId } = req.params
  
  
}

export { getSeats, bookSeats };