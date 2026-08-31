import { z } from "zod";

export const taskSchema = z.object({
  taskName: z.string().min(1).max(200, "Task name is too long"),
})

export const deleteTaskSchema = z.object({
  taskId: z.coerce.number().int().positive(),
});

export const noteSchema = z.object({
  noteContent: z.string().max(500, "Note content is too long!")
})

export const deleteNoteSchema = z.object({
  noteId: z.coerce.number().int().positive()
})