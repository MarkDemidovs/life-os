import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    taskName: text("task_name").notNull().default("New Todo"),
    isCompleted: boolean("is_completed").notNull().default(false),
    userId: text("user_id").notNull()
})

export const notes = pgTable("notes", {
    id: serial("id").primaryKey(),
    noteContent: text("noteContent").default("New Note"),
    userId: text("userId").notNull()
})

export type TaskType = typeof tasks.$inferSelect;
export type NoteType = typeof notes.$inferSelect;