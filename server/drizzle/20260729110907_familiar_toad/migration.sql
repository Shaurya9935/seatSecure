CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(80) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"verificantion_token" text,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
