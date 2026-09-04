import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    taskName: text("task_name").notNull().default("New Todo"),
    isCompleted: boolean("is_completed").notNull().default(false),
    userId: text("user_id").notNull()
})

export const notes = pgTable("notes", {
    id: serial("id").primaryKey(),
    noteContent: text("noteContent").notNull().default("New Note"),
    userId: text("userId").notNull()
})

export const habits = pgTable("habits", {
    id: serial("id").primaryKey(),
    habitName: text("habitName").notNull().default("New habit"),
    streak: integer("streak").notNull().default(0),
    dateCreated: text("dateCreated").notNull().default(new Date().toISOString()),
    userId: text("userId").notNull()

})
export type TaskType = typeof tasks.$inferSelect;
export type NoteType = typeof notes.$inferSelect;