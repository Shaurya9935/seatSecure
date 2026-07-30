CREATE TABLE "booking_seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"booking_id" uuid NOT NULL,
	"seat_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"show_id" uuid NOT NULL,
	"total_amount" integer NOT NULL,
	"status" varchar(20) DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"imdb_id" varchar(20) NOT NULL UNIQUE,
	"title" varchar(150) NOT NULL,
	"poster" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "screens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"theatre_id" uuid NOT NULL,
	"name" varchar(20) NOT NULL,
	"total_seats" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"screen_id" uuid NOT NULL,
	"row" varchar(2) NOT NULL,
	"number" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "shows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"movie_id" uuid NOT NULL,
	"screen_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "theatres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"address" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(80) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"role" varchar(20) DEFAULT 'customer' NOT NULL,
	"is_verified" boolean DEFAULT false,
	"password" text NOT NULL,
	"verification_token" text,
	"refresh_token" text,
	"reset_password_token" text,
	"reset_password_expires" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "booking_seats" ADD CONSTRAINT "booking_seats_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id");--> statement-breakpoint
ALTER TABLE "booking_seats" ADD CONSTRAINT "booking_seats_seat_id_seats_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_show_id_shows_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("id");--> statement-breakpoint
ALTER TABLE "screens" ADD CONSTRAINT "screens_theatre_id_theatres_id_fkey" FOREIGN KEY ("theatre_id") REFERENCES "theatres"("id");--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_screen_id_screens_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "screens"("id");--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_movie_id_movies_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id");--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_screen_id_screens_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "screens"("id");