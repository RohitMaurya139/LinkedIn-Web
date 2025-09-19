import express from "express"
import { getCurrentUser, updateProfile } from "../controllers/userController.js"
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser)
userRouter.put("/updateProfile", isAuth, updateProfile)

export default userRouter;