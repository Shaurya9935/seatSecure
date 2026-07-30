import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),

  imdbId: varchar("imdb_id", { length: 20 }).notNull().unique(),
  title: varchar("title", { length: 150 }).notNull(),
  poster: varchar("poster", { length: 500 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const theatres = pgTable("theatres", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
});

export const screens = pgTable("screens", {
  id: uuid("id").primaryKey().defaultRandom(),

  theatreId: uuid("theatre_id")
    .references(() => theatres.id)
    .notNull(),

  name: varchar("name", { length: 20 }).notNull(),

  totalSeats: integer("total_seats").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const shows = pgTable("shows", {
  id: uuid("id").primaryKey().defaultRandom(),

  movieId: uuid("movie_id")
    .references(() => movies.id)
    .notNull(),

  screenId: uuid("screen_id")
    .references(() => screens.id)
    .notNull(),

  startTime: timestamp("start_time").notNull(),

  price: integer("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});