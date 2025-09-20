import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        author: {
          type: mongoose.Schema.ObjectId,
            ref: "User",
        required: true,
      },
    image: {
      type: String,
        },
        description: {
            type: String,
            default:"",
      },
    like: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        content: { type: String },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema)
export default Post;