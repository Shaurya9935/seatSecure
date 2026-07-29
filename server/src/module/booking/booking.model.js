import { boolean, pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "../auth/auth.model.js";

export const bookingSchema = pgTable("seats", {
  id: uuid("id").primaryKey().defaultRandom(),

  seatNumber: integer("seat_number").notNull(),

  // nullable — null means the seat is available
  userId: uuid("user_id").references(() => users.id),
  isBooked: boolean("is_booked").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});