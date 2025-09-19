import User from "../models/userModel.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-Password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ message: "User Data Fetched Successfully", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const {}=req.body
  } catch (error) {
     return res
       .status(500)
       .json({ message: "Server Error", error: error.message });
  }
}