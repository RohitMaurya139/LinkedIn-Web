import React, { useContext } from 'react'
import dp from "../assets/dp.webp";
import { UserData } from "../context/userDataContext.js";
const CreatePost = () => {
    const { post,setPost,userData } = useContext(UserData);
    const handlePost = () => {
       setPost(!post)
   }
  return (
    <>
      <div className="w-full h-[120px] bg-white shadow-lg rounded-lg flex items-center justify-center gap-2">
        <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#006699] transition mx-3">
          <img
            src={userData.data.ProfilePic || dp}
            alt="user profile"
            className="h-full w-full object-cover"
          />
        </div>
        <button className="w-[80%] h-[50px] border-2 rounded-full border-gray-500 text-gray-400 text-start cursor-pointer hover:bg-gray-200 hover:text-black" onClick={handlePost}>
          {" "}
          <span className="ml-3"> Start a Post </span>
        </button>
      </div>
    </>
  );
}

export default CreatePost