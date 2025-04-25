import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
 {
    createdAt:{
        type: Date,
        default: new Date()
    }, 
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    }, 
    {
        timeStamps: true,
    }
)

export default mongoose.model('Comment', CommentSchema)