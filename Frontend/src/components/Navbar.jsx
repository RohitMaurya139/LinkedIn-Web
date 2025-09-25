import React, { useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaHome, FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import dp from "../assets/dp.webp";
import logo2 from "../assets/logo2.png";
import { UserData } from "../context/userDataContext.js";
import UserInfoCard from "./UserInfoCard.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { userData } = useContext(UserData);
  const userInfoRef = useRef();
const navigate = useNavigate();
  // Handle click-away close
  useEffect(() => {
    if (!showUserInfo) return;

    const handleClickOutside = (event) => {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setShowUserInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserInfo]);

  const handelShowButton = () => setShowUserInfo(true);

  return (
    <div className="bg-white fixed w-full h-[60px] lg:h-[80px] inset-0 shadow-lg flex items-center justify-between px-6 lg:px-20 z-500">
      {/* Left: Logo and Search */}
      <div className="flex items-center gap-6">
        <img
          src={logo2}
          alt="logo"
          className="w-[40px] lg:w-[50px] cursor-pointer"
        />

        <form className="flex items-center bg-gray-100 rounded-md px-3 py-2 gap-2 w-[200px] lg:w-[450px]">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full lg:w-full text-gray-700 placeholder-gray-500"
          />
        </form>
      </div>

      {/* Right: Navigation Items */}
      <div className="flex items-center gap-8 text-gray-600 font-semibold relative">
        {showUserInfo && (
          <div
            ref={userInfoRef}
            className="absolute -top-4 right-3 z-50"
            // Style/position as needed
          >
            <UserInfoCard />
          </div>
        )}

        <NavItem
          icon={<FaHome />}
          label="Home"
          onClick={() => navigate("/")}
        />
        <NavItem
          icon={<FaUserFriends />}
          label="My Network"
          onClick={() => navigate("/network")}
        />
        <NavItem icon={<IoMdNotifications />} label="Notifications" />

        <div
          className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#006699] transition mx-3"
          onClick={handelShowButton}
        >
          <img
            src={userData.data.ProfilePic || dp}
            alt="user profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, onClick }) => (
  <div
    className="lg:flex flex-col items-center cursor-pointer hover:text-[#006699] transition hidden"
    onClick={onClick}
  >
    <div className="text-xl">{icon}</div>
    <div className="text-sm">{label}</div>
  </div>
);

export default Navbar;
