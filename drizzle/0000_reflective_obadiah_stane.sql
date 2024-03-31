CREATE TABLE IF NOT EXISTS "tasks" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" varchar NOT NULL,
	"created_at" varchar NOT NULL,
	"updated_at" varchar NOT NULL,
	"assignee" varchar NOT NULL
);
