import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createPost, getPost,like,comment } from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.post("/create",isAuth,upload.single("image"),createPost);
postRouter.get("/get",isAuth,getPost);
postRouter.post("/like/:id",isAuth,like);
postRouter.post("/comment/:id",isAuth,comment);


export default postRouter;
