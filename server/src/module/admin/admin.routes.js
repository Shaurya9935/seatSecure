import { Router } from "express";
import {
  createShow,
  getTheatres,
  getScreens,
  getShows,
} from "./admin.controller.js";

const router = Router();

router.post("/shows", createShow);
router.get("/theatres", getTheatres);
router.get("/screens", getScreens);
router.get("/shows", getShows);

export default router;
