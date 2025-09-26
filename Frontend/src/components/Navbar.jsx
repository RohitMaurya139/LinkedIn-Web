import React, { useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaHome, FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import dp from "../assets/dp.webp";
import logo2 from "../assets/logo4.png";
import { UserData } from "../context/userDataContext.js";
import UserInfoCard from "./UserInfoCard.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/authDataContext.js";

const Navbar = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { userData, getProfile } = useContext(UserData);
  const userInfoRef = useRef();
  const navigate = useNavigate();
  const { SERVER_URL } = useContext(AuthDataContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);

  // Handle click-away for user info card
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

  // Search user API call
  const handelSearch = async () => {
    if (!searchInput.trim()) {
      setSearchOutput([]);
      return;
    }

    try {
      const res = await axios.get(
        SERVER_URL +
          `/api/user/search?query=${encodeURIComponent(searchInput)}`,
        { withCredentials: true }
      );
      setSearchOutput(res.data.data);
    } catch (error) {
      setSearchOutput([]);
      console.error(error.message);
    }
  };

  // Trigger search on input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handelSearch();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  return (
    <div className="bg-white fixed w-full h-[60px] lg:h-[80px] inset-0 shadow-lg flex items-center justify-between px-6 lg:px-20 z-50 relative">
      {/* Left: Logo and Search */}
      <div
        className="flex items-center gap-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo2} alt="logo" className="w-[100px] lg:w-[180px]" />

        <div className="relative w-[200px] lg:w-[450px]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center bg-gray-100 rounded-md px-3 py-2 gap-2"
          >
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
            />
          </form>

          {searchInput && searchOutput.length > 0 && (
            <div className="absolute top-[50px] left-10 mt-1 max-h-64 overflow-auto w-full bg-white rounded-md shadow-lg border border-gray-300  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ">
              {searchOutput.map((sea) => (
                <div
                  key={sea._id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                  onClick={() => getProfile(sea.UserName)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={sea.ProfilePic || dp}
                      alt="user Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {sea.FirstName} {sea.LastName}
                    </h2>
                    <h4 className="text-gray-600 text-sm">{sea.headline}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Navigation Items */}
      <div className="flex items-center gap-8 text-gray-600 font-semibold relative">
        {showUserInfo && (
          <div ref={userInfoRef} className="absolute -top-4 right-3 z-50">
            <UserInfoCard />
          </div>
        )}

        <NavItem icon={<FaHome />} label="Home" onClick={() => navigate("/")} />
        <NavItem
          icon={<FaUserFriends />}
          label="My Network"
          onClick={() => navigate("/network")}
        />
        <NavItem
          icon={<IoMdNotifications />}
          label="Notifications"
          onClick={() => navigate("/notification")}
        />

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
