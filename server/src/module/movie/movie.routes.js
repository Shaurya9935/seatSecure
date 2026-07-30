import { Router } from "express";
import { searchMovies } from "./movie.controller.js";


const router = Router();

router.get("/search", searchMovies)

export default router;