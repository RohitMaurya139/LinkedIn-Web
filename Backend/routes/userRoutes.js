import express from "express"
import { getCurrentUser, getProfile, getSuggestedUsers, search, updateProfile } from "../controllers/userController.js"
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
userRouter.get("/search", isAuth, search)
userRouter.get("/suggested", isAuth, getSuggestedUsers)

export default userRouter;