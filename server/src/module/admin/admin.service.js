import ApiError from "../../common/utils/api-error.js";
import * as movieService from "../movie/movie.service.js";
import * as adminRepository from "./admin.repository.js";

const createShowService = async ({ imdbId, screenId, startTime, price }) => {
  if (!imdbId) throw ApiError.badRequest("imdbId is required");
  if (!screenId) throw ApiError.badRequest("screenId is required");
  if (!startTime) throw ApiError.badRequest("startTime is required");
  if (price === undefined || price === null) throw ApiError.badRequest("price is required");

  // 1. Check whether movie already exists in movies table
  let movie = await adminRepository.findMovieByImdbId(imdbId);

  // 2. If movie does not exist, fetch from OMDb service & insert into movies table
  if (!movie) {
    const omdbMovie = await movieService.detail(imdbId);
    movie = await adminRepository.createMovie({
      imdbId: omdbMovie.imdbId || imdbId,
      title: omdbMovie.title,
      poster: omdbMovie.poster,
    });
  }

  // 3. Check whether screen exists
  const screen = await adminRepository.findScreenById(screenId);
  if (!screen) {
    throw ApiError.notFound(`Screen with ID '${screenId}' not found`);
  }

  // 4. Create show
  const show = await adminRepository.createShow({
    movieId: movie.id,
    screenId: screen.id,
    startTime,
    price,
  });

  // 5. Format & return response
  return {
    showId: show.id,
    movie: {
      id: movie.id,
      imdbId: movie.imdbId,
      title: movie.title,
      poster: movie.poster,
    },
    screen: {
      id: screen.id,
      name: screen.name,
      theatreId: screen.theatreId,
    },
    time: show.startTime,
    price: show.price,
  };
};

const getTheatresService = async () => {
  return adminRepository.getAllTheatres();
};

const getScreensService = async () => {
  return adminRepository.getAllScreensWithTheatres();
};

const getShowsService = async () => {
  return adminRepository.getAllShowsWithDetails();
};

export {
  createShowService,
  getTheatresService,
  getScreensService,
  getShowsService,
};
