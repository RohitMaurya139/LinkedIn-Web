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