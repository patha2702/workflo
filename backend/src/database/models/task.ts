import mongoose, {Document, Schema, Model} from "mongoose";

export enum TaskStatus {
    TODO="todo",
    IN_PROGRESS="inprogress",
    UNDER_REVIEW="underreview",
    COMPLETED="completed"
}

export enum PriorityStatus {
    LOW="low",
    MEDIUM="medium",
    URGENT="urgent"
}

interface ITask extends Document {
    title: string
    description ?: string
    status : TaskStatus
    priority ?: PriorityStatus
    deadline ?: Date | null
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
        required: true,
        default: TaskStatus.TODO
    },
    priority: {
        type: String,
        enum: Object.values(PriorityStatus),
        required: false,
        default: PriorityStatus.LOW
    },
    deadline: {
        type: Date,
        required: false,
        default: null
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

