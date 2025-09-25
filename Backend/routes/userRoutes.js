import express from "express"
import { getCurrentUser, getProfile, updateProfile } from "../controllers/userController.js"
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

userRouter.get("/profile/:username", isAuth, getProfile)

export default userRouter;