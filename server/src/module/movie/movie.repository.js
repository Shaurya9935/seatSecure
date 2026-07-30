import { eq } from "drizzle-orm";
import { movies } from "./movie.model.js";
import { db } from "../../common/config/db.js";

export async function findMovieByImdbId(imdbId) {
    return db.query.movies.findFirst({
        where: eq(movies.imdbId, imdbId)
    })
}

export async function findShowsByMovieId(movieId) {
  return db
    .select({
      showId: shows.id,
      theatre: theatres.name,
      screen: screens.name,
      startTime: shows.startTime,
      price: shows.price,
    })
    .from(shows)
    .innerJoin(screens, eq(shows.screenId, screens.id))
    .innerJoin(theatres, eq(screens.theatreId, theatres.id))
    .where(eq(shows.movieId, movieId));
}