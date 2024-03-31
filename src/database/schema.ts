import { pgTable, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
    id: varchar("id").primaryKey(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    status: varchar("status").notNull(),
    createdAt: varchar("created_at").notNull(),
    updatedAt: varchar("updated_at").notNull(),
    assignee: varchar("assignee").notNull(),
});

export const users = pgTable("users", {
    id: varchar("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
    createdAt: varchar("created_at").notNull(),
    updatedAt: varchar("updated_at").notNull(),
    role: varchar("role").notNull(),
});