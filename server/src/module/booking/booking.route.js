import { Router } from "express";
import { getSeats } from "./booking.controller.js";

const router = Router();

router.get("/:showId/seats", getSeats);
// router.put("/seats/:id/book", bookSeat);


export default router;