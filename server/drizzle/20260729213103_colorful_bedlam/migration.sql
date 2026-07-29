ALTER TABLE "seats" ADD COLUMN "seat_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ALTER COLUMN "is_booked" SET NOT NULL;