import { Router } from "express";
import { searchMovies, searchDetails } from "./movie.controller.js";


const router = Router();

router.get("/search", searchMovies)
router.get("/:imdbId", searchDetails)

export default router;