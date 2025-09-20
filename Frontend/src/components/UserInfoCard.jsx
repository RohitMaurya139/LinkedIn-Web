import React, { useContext } from 'react'
import { UserData } from '../context/userDataContext';
import { FaSearch, FaHome, FaUserFriends } from "react-icons/fa";
import dp from "../assets/dp.webp";
import axios from 'axios';
import { AuthDataContext } from '../context/authDataContext';
import { useNavigate } from 'react-router-dom';
const UserInfoCard = () => {
    const { userData } = useContext(UserData); 
    const { SERVER_URL } = useContext(AuthDataContext)
    const navigate = useNavigate();
    
    const handelSignOut = async () => {
        try {
            const res = await axios.post(SERVER_URL + "/api/auth/logout", {}, { withCredentials: true })
            navigate("/login")
        } catch (error) {
            console.error(error.message)
        }
      
  }
  return (
    <>
      <div>
        <div className="w-[200px] h-[300px] bg-white shadow-lg absolute top-[75px] right-3 rounded-lg flex flex-col p-3 gap-3 items-center">
          <div className="w-[25px] h-[25px] lg:w-[40px] lg:h-[40px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#006699] transition">
            <img
              src={userData.data.ProfilePic || dp}
              alt="user profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-center">
              {userData?.data?.FirstName && userData?.data?.LastName
                ? `${userData.data.FirstName} ${userData.data.LastName}`
                : "Guest"}
            </div>
            <button className="w-full h-[40px] mt-2 cursor-pointer rounded-full border px-8 border-[#006699] text-[#0372a1] hover:bg-[#006699] hover:text-white transition">
              View Profile
            </button>
            <hr className="mt-2 border-t border-gray-700" />
            <div className="flex items-center cursor-pointer justify-center gap-2 mt-2 hover:text-[#006699] transition">
              <div>
                <FaUserFriends />
              </div>
              <div>My Network</div>
            </div>
            <button
              className="w-full h-[40px] mt-2 cursor-pointer rounded-full border px-8 border-[#b61a05] text-[#d91818] hover:bg-[#d91818] hover:text-white transition"
              onClick={handelSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfoCard