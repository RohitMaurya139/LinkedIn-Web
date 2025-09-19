import React, { useContext } from "react";
import dp from "../assets/dp.webp";
import { FaPlus } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { UserData } from "../context/userDataContext.js";
import { IoPencil } from "react-icons/io5";

const EditProfile = () => {
  const { userData ,edit,setEdit } = useContext(UserData);
  const handelEdit = () => {
     setEdit(!edit)
   }
  return (
    <>
      {/* Cover photo section */}
      <div className="w-full h-[120px] bg-gray-400 rounded-t-lg overflow-hidden flex items-center justify-center relative">
        <img
          src={userData.data.CoverPic}
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1 text-black text-2xl cursor-pointer hover:bg-opacity-100 transition-shadow shadow-md z-50"
          onClick={handelEdit}
        >
          <IoCameraOutline />
        </div>
      </div>

      {/* Profile picture and plus icon */}
      <div className="relative w-fit mx-3 -mt-14 lg:-mt-20">
        <div className="cursor-pointer">
          <div className="relative top-4 w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
            <img
              src={dp}
              alt="user profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute top-[50px] left-[50px] z-50 bg-[#06a2f0] p-1  rounded-full text-white text-sm lg:text-lg border-2 border-white shadow-md hover:bg-[#0480c0] transition transform translate-x-1/2 translate-y-1/2"
            onClick={handelEdit}
          >
            <FaPlus />
          </div>
        </div>

        {/* User information and button below */}
        <div className="mt-4 text-start max-w-xs">
          <h2 className="font-bold text-lg lg:text-xl text-gray-900">
            {userData?.data?.FirstName && userData?.data?.LastName
              ? `${userData.data.FirstName} ${userData.data.LastName}`
              : "Guest"}
          </h2>
          <p className="text-md text-gray-700">
            {userData?.data?.headline || "MERN Stack Developer"}
          </p>
          <p className="text-md text-gray-700">
            {userData?.data?.location || "Delhi, India"}
          </p>
          <button
            className="mt-4 ml-6 w-full h-[40px] cursor-pointer rounded-full border border-[#006699] px-8 text-[#0372a1] hover:bg-[#006699] hover:text-white transition flex items-center justify-center gap-2"
            onClick={handelEdit}
          >
            Edit Profile
            <IoPencil />
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
