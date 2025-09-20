import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js"
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
    console.log(req.body)
    console.log(req.files)
    const {
      FirstName,
      LastName,
      UserName,
      headline,
      location,
      gender,
    } = req.body;
const skills=req.body.skills?JSON.parse(req.body.skills):[]
 const education = req.body.education ? JSON.parse(req.body.education) : [];
 const experience = req.body.experience ? JSON.parse(req.body.experience) : [];
    let ProfilePic; 
    let CoverPic; 
    if (req.files.ProfilePic) {
      ProfilePic = await uploadOnCloudinary(req.files.ProfilePic[0].path);
    }
    if (req.files.CoverPic) {
      CoverPic = await uploadOnCloudinary(req.files.CoverPic[0].path);
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        FirstName,
        LastName,
        UserName,
        headline,
        skills,
        education,
        location,
        gender,
        experience,
        ProfilePic,
        CoverPic,
      },
      { new: true }
    ).select("-Password");
    return res.status(200).json({message:"Profile Updated Successfully", data: user })
  } catch (error) {
     return res
       .status(500)
       .json({ message: "Server Error", error: error.message });
  }
}