
import { z } from "zod"

const StatusType = z.enum(["Todo", "InProgress", "UnderReview", "Completed"])
const PriorityType = z.enum(["Low", "Medium", "Urgent"])

export const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: StatusType,
    priority: PriorityType.optional(),
    deadline: z.date().optional()
})


