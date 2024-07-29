
import { z } from "zod"
import { TaskStatus, PriorityStatus } from "../database/models/task"

const StatusType = z.nativeEnum(TaskStatus)
const PriorityType = z.nativeEnum(PriorityStatus)

export const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: StatusType,
    priority: PriorityType.optional(),
    deadline: z.date().optional()
})

export const updateTaskSchema = z.object({
    id: z.string(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: StatusType.optional(),
    priority: PriorityType.optional(),
    deadline: z.union([z.date(), z.null()]).optional()
})

export const deleteTaskSchema = z.object({
    id: z.string()
})
