CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"is_booked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "verificantion_token" TO "verification_token";--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");