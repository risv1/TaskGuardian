CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"created_at" varchar NOT NULL,
	"updated_at" varchar NOT NULL,
	"role" varchar NOT NULL
);
