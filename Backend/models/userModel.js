import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minLength: 8,
        
    },
    ProfilePic: {
        type: String,
        default: "",
    },
    CoverPic: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "",
    },
    skills: {
        type: [{ type: String }],
        default: [],
    },
    education: {
        type: [{
            college: String,
            degree: String,
            fieldOfStudy: String,
        }],
       
    },
    location: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    experience: [
        {
            title: String,
            company: String,
            description: String,
            duration: String,
        }
        ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
    
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;