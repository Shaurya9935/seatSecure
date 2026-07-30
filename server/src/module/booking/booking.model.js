import {
  pgTable,
  uuid,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "../auth/auth.model.js";
import { screens, shows } from "../movie/movie.model.js";

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  showId: uuid("show_id")
    .references(() => shows.id)
    .notNull(),

  totalAmount: integer("total_amount").notNull(),

  status: varchar("status", { length: 20 })
    .default("confirmed")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const bookingSeats = pgTable("booking_seats", {
    id: uuid("id").primaryKey().defaultRandom(),

    bookingId: uuid("booking_id")
        .references(() => bookings.id)
        .notNull(),

    seatId: uuid("seat_id")
        .references(() => seats.id)
        .notNull(),
});

export const seats = pgTable("seats", {
    id: uuid("id").primaryKey().defaultRandom(),

    screenId: uuid("screen_id")
        .references(() => screens.id)
        .notNull(),

    row: varchar("row", { length: 2 }).notNull(),

    number: integer("number").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
});