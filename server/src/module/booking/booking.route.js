import { Router } from "express";
import { bookSeats, getSeats } from "./booking.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/:showId/seats", getSeats);
router.post("/",authenticate ,bookSeats)
// router.put("/seats/:id/book", bookSeat);


export default router;