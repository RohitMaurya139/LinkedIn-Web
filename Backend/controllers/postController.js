import  uploadOnCloudinary  from "../config/cloudinary.js";
import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

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
      .populate("author", "FirstName LastName ProfilePic headline")
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
      post.like=post.like.filter((id)=> id!==userId)
    }else{ post.like.push(userId)}
    post.save();
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
    const {content} = req.body
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
    
    return res
      .status(200)
      .json({ message: "Post Comment added Successfully", data: post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};