import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import  { useContext } from "react";
import dp from "../assets/dp.webp";
import { FaPlus } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

import { UserData } from "../context/userDataContext.js";
import { IoPencil } from "react-icons/io5";
import ProfileEdit from '../components/ProfileEdit.jsx';
import UserPost from '../components/UserPost.jsx';
import axios from 'axios';
import { AuthDataContext } from '../context/authDataContext';
import ConnectionButton from '../components/ConnectionButton.jsx';
const Profile = () => {
  const {
    userData,
    edit,
    setEdit,
    userPostData,
    setUserPostData,
    profileData,
    setProfileData,
  } = useContext(UserData);

  const { SERVER_URL } = useContext(AuthDataContext);
  const [profilePost,setProfilePost]=useState([]);
    const handelEdit = () => {
       setEdit(!edit)
  }


  useEffect(() => {
    setProfilePost(
      userPostData.data.filter((post) => post.author._id == profileData._id)
    );
  },[profileData])
  return (
    <div className="w-full min-h-screen bg-[#f1f1ee] flex flex-col items-center ">
      {edit && <ProfileEdit />}
      <Navbar />
      <div className="w-full max-w-[900px] min-h-screen bg-white rounded-lg shadow-lg flex flex-col items-center">
        <div>
          {/* Cover image */}
          <div className="min-w-[900px]  h-64 lg:h-70 bg-gray-400 rounded-t-lg overflow-hidden flex items-center justify-center relative">
            <img
              src={profileData.CoverPic}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile circle overlays the cover */}
          <div className="relative w-fit mx-6 -mt-20 flex items-center">
            <div className="relative w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-gray-300 shadow-md bg-white">
              <img
                src={profileData.ProfilePic || dp}
                alt="user profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User information and button */}
          <div className="flex items-start justify-between pt-8 px-6">
            <div>
              <h2 className="font-bold text-2xl lg:text-3xl text-gray-900">
                {profileData?.FirstName && profileData?.LastName
                  ? `${profileData.FirstName} ${profileData.LastName}`
                  : "Guest"}
              </h2>
              <p className="text-lg text-gray-700 mt-1">
                {profileData?.headline || "MERN Stack Developer"}
              </p>
              <p className="text-md text-gray-500 mt-1">
                {profileData?.location || "Delhi, India"}
              </p>
              <p className="text-lg text-[#007cb5] font-semibold mt-2">
                {profileData.connection.length} Connections
              </p>
            </div>

            {userData.data._id == profileData._id && (
              <button
                className="mt-2 h-12 px-6 rounded-full border border-[#006699] text-[#0372a1] font-semibold hover:bg-[#006699] hover:text-white transition flex items-center gap-2"
                onClick={handelEdit}
              >
                Edit Profile
                <IoPencil />
              </button>
            )}
          {userData.data._id != profileData._id && <ConnectionButton userId={profileData._id}/> }
          </div>
        </div>
      </div>
      {/* Posts Section */}
      <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg flex flex-col items-center mt-6 mb-6 p-6 gap-6">
        <div className="w-full px-4 py-2 font-bold text-2xl text-center text-gray-900 border-b border-gray-300">
          {`My Posts (${profilePost.length})`}
        </div>
        <div className="w-full flex flex-col gap-6">
          {profilePost.map((post) => {
            const {
              _id,
              author,
              like,
              comment,
              image,
              description,
              createdAt,
            } = post;
            return (
              <UserPost
                key={_id}
                id={_id}
                author={author}
                like={like}
                comment={comment}
                image={image}
                description={description}
                createdAt={createdAt}
              />
            );
          })}
        </div>
      </div>
      {/* Skill Section */}
      <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg flex flex-col items-center mt-6 mb-6 p-6 gap-6">
        <div className="w-full px-4 py-2 font-bold text-2xl text-center text-gray-900 border-b border-gray-300 flex justify-between">
          {`Skills (${profileData.skills.length})`}
          {userData.data._id == profileData._id && (
            <div
              className="text-[#007cb5] cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              <IoIosAddCircleOutline size={35} />
            </div>
          )}
        </div>
        <div className="w-fit flex flex-wrap justify-start gap-4 px-4">
          {profileData.skills.map((skill, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 hover:shadow-md transition shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {skill}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg flex flex-col items-center mt-6 mb-6 p-6 gap-6">
        <div className="w-full px-4 py-2 font-bold text-2xl text-center text-gray-900 border-b border-gray-300 flex justify-between">
          {`Education (${profileData.education.length})`}
          {userData.data._id == profileData._id && (
            <div
              className="text-[#007cb5] cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              <IoIosAddCircleOutline size={35} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-4 px-4">
          {profileData.education.map(
            ({ college, degree, fieldOfStudy }, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md p-4 hover:shadow-md transition shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  College: {college}
                </h3>
                <p className="text-gray-700 mb-1">Degree: {degree}</p>
                <p className="text-gray-700">Branch: {fieldOfStudy}</p>
              </div>
            )
          )}
        </div>
      </div>
      {/* Experience Section */}
      <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg flex flex-col items-center mt-6 mb-6 p-6 gap-6">
        <div className="w-full px-4 py-2 font-bold text-2xl text-center text-gray-900 border-b border-gray-300 flex justify-between">
          {`Experience (${profileData.experience.length})`}
          {userData.data._id == profileData._id && (
            <div
              className="text-[#007cb5] cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              <IoIosAddCircleOutline size={35} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-4 px-4">
          {profileData.experience.map(
            ({ title, company, description, duration }, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md p-4 hover:shadow-md transition shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  Company: {company}
                </h3>
                <p className="text-gray-700 mb-1">Role: {title}</p>
                <p className="text-gray-700">Description: {description}</p>
                <p className="text-gray-700">Duration: {duration}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile