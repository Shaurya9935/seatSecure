import { eq } from "drizzle-orm";
import { movies, screens, shows, theatres } from "./movie.model.js";
import { db } from "../../common/config/db.js";

export async function findMovieByImdbId(imdbId) {
  const [movie] = await db
  .select()
  .from(movies)
  .where(eq(movies.imdbId, imdbId))
  .limit(1) 
  return movie;
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
