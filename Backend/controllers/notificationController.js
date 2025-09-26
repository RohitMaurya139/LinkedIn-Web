import { io } from "../index.js";
import Notification from "../models/notificationModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const getNotifications = async (req, res) => {
    try {
        const receiverId = req.userId;
        const notification = await Notification.find({
          receiver: receiverId,
        })
          .populate(
            "relatedUser",
            "FirstName LastName ProfilePic headline _id UserName"
          )
          .populate("relatedPost", "image description");
    return res.status(200).json({message: "Notification Fetched SuccessFully",data:notification})
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
}
export const deleteNotifications = async (req, res) => {
    try {
        const {id} = req.params;
         await Notification.findByIdAndDelete(id)
    return res.status(200).json({message: "Notification Deleted SuccessFully"})
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
}
export const clearAllNotifications = async (req, res) => {
    try {
   
         await Notification.deleteMany({receiver:req.userId})
    return res.status(200).json({message: "All Notification Deleted SuccessFully"})
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
}