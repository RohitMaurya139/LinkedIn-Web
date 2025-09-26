import  uploadOnCloudinary  from "../config/cloudinary.js";
import { io } from "../index.js";
import Notification from "../models/notificationModel.js";
import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
    try {

        const { description } = req.body
        let newPost;
        if (req.file) {
            let image = await uploadOnCloudinary(req.file.path);
            newPost = await Post.create({
                author:req.userId,
                description,
                 image
            })
        } else {
            newPost = await Post.create({
                  author:req.userId,
                description,
              });
        }
         return res
           .status(200)
           .json({ message: "Post Created Successfully", data: newPost });
    } catch (error) {
       return res
         .status(500)
         .json({ message: "Server Error", error: error.message });
    }
}

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({})
      .populate("author", "FirstName LastName ProfilePic headline _id UserName").populate("comment.user", "FirstName LastName ProfilePic headline")
      .sort({ createdAt :-1});

    return res
      .status(200)
      .json({ message: "Post Fetched Successfully", data: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const like = async (req, res) => {
  try {
    const postId = req.params.id 
    const userId = req.userId
    const post = await Post.findById(postId)
    if (!post) {
      res.status(400)
      .json({ message: "Post Not Found"});
    }
    else if (post.like.includes(userId)) {
      post.like = post.like.filter((id) => id.toString() !== userId.toString());
    } else {
      post.like.push(userId)
      if (post.author != userId) {
           const notification = await Notification.create({
             receiver: post.author,
             type: "like",
             relatedUser: userId,
             relatedPost: postId,
           });
      }
   
    }
    post.save();
    io.emit("likeUpdated",{postId,likes:post.like})
      return res
        .status(200)
        .json({ message: "Post Liked added Successfully", data: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}

export const comment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body
    const userId = req.userId;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comment: { content, user: userId } },
      },
      { new: true }
    )
      .populate("comment.user", "FirstName LastName ProfilePic headline")
      .sort({ createdAt: -1 });
     if (post.author != userId) {
       const notification = await Notification.create({
         receiver: post.author,
         type: "comment",
         relatedUser: userId,
         relatedPost: postId,
       });
     }
     io.emit("commentAdded", { postId, comm: post.comment });
    return res
      .status(200)
      .json({ message: "Post Comment added Successfully", data: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};