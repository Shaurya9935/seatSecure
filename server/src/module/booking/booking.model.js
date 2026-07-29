import { boolean, pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { userSchema } from "../auth/auth.model.js";


export const bookingSchema = pgTable('seats',{
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id').references(()=>userSchema.id).notNull(),
    isBooked:boolean('is_booked').default(false),
    
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(()=> new Date())
})