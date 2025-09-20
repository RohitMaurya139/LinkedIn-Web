import { uploadOnCloudinary } from "../config/cloudinary.js";
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

    } catch (error) {
        console.log(error.message)
    }
}