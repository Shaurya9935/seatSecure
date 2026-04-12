import express from "express";
import { bookSeat, getSeats } from "./booking.controller.js";

const router = express.Router();

router.get("/seats", getSeats);
router.put("/seats/:id/book", bookSeat);

export default router;