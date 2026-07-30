import { eq } from "drizzle-orm";
import { db } from "../../common/config/db.js";
import { movies, theatres, screens, shows } from "../movie/movie.model.js";

export async function findMovieByImdbId(imdbId) {
  const [movie] = await db
    .select()
    .from(movies)
    .where(eq(movies.imdbId, imdbId))
    .limit(1);
  return movie || null;
}

export async function findMovieById(id) {
  const [movie] = await db
    .select()
    .from(movies)
    .where(eq(movies.id, id))
    .limit(1);
  return movie || null;
}

export async function createMovie({ imdbId, title, poster }) {
  const [movie] = await db
    .insert(movies)
    .values({
      imdbId,
      title,
      poster,
    })
    .returning();
  return movie;
}

export async function findScreenById(screenId) {
  const [screen] = await db
    .select()
    .from(screens)
    .where(eq(screens.id, screenId))
    .limit(1);
  return screen || null;
}

export async function createShow({ movieId, screenId, startTime, price }) {
  const [show] = await db
    .insert(shows)
    .values({
      movieId,
      screenId,
      startTime: new Date(startTime),
      price: Number(price),
    })
    .returning();
  return show;
}

export async function getAllTheatres() {
  return db.select().from(theatres);
}

export async function getAllScreensWithTheatres() {
  const rows = await db
    .select({
      id: screens.id,
      name: screens.name,
      totalSeats: screens.totalSeats,
      createdAt: screens.createdAt,
      theatre: {
        id: theatres.id,
        name: theatres.name,
        city: theatres.city,
        address: theatres.address,
      },
    })
    .from(screens)
    .innerJoin(theatres, eq(screens.theatreId, theatres.id));

  return rows;
}

export async function getAllShowsWithDetails() {
  const rows = await db
    .select({
      showId: shows.id,
      time: shows.startTime,
      price: shows.price,
      movie: {
        id: movies.id,
        imdbId: movies.imdbId,
        title: movies.title,
        poster: movies.poster,
      },
      theatre: {
        id: theatres.id,
        name: theatres.name,
        city: theatres.city,
        address: theatres.address,
      },
      screen: {
        id: screens.id,
        name: screens.name,
        totalSeats: screens.totalSeats,
      },
    })
    .from(shows)
    .innerJoin(movies, eq(shows.movieId, movies.id))
    .innerJoin(screens, eq(shows.screenId, screens.id))
    .innerJoin(theatres, eq(screens.theatreId, theatres.id));

  return rows;
}
