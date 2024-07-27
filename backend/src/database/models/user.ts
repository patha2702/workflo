import mongoose, { Document, Model, Schema} from "mongoose";

interface IUser extends Document {
    name: string
    email: string
    passwordHash: string
    avatarUrl ?: string
    createdAt: Date
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User : Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User
