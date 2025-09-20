import express from "express"
import { getCurrentUser, updateProfile } from "../controllers/userController.js"
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"
const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser)
userRouter.put(
  "/updateprofile",
  isAuth,
  upload.fields([
    { name: "ProfilePic", maxCount: 1 },
    { name: "CoverPic", maxCount: 1 },
  ]),
  updateProfile
);

export default userRouter;