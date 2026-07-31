import { Router } from "express";
import { searchMovies, searchDetails, searchShows } from "./movie.controller.js";


const router = Router();

router.get("/search", searchMovies)
router.get("/:imdbId", searchDetails)
router.get("/:imdbId/shows", searchShows)

export default router;