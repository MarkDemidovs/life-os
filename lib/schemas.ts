import { z } from "zod";

export const taskSchema = z.object({
    taskName: z.string().min(1).max(200, "Task name is too long"),
})

export const deleteTaskSchema = z.object({
  taskId: z.coerce.number().int().positive(),
});