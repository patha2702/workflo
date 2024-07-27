import mongoose, {Document, Schema, Model} from "mongoose";

enum TaskStatus {
    Todo="todo",
    InProgress="inprogress",
    UnderReview="underreview",
    Completed="completed"
}

enum PriorityStatus {
    Low="low",
    Medium="medium",
    Urgent="urgent"
}

interface ITask extends Document {
    title: string
    description ?: string
    status : TaskStatus
    priority ?: PriorityStatus
    deadline ?: Date
    author : Schema.Types.ObjectId
    createdAt : Date
}

const taskSchema: Schema<ITask> = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status : {
        type: String,
        enum: Object.values(TaskStatus),
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(PriorityStatus),
        required: false
    },
    deadline: {
        type: Date,
        required: false,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema)

export default Task

