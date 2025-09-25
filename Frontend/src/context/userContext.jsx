import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserData } from "./userDataContext.js";
import { AuthDataContext } from "./authDataContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { io } from "socket.io-client";
function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [userPostData, setUserPostData] = useState( [] );
  const [loading, setLoading] = useState(true);
  const [edit , setEdit]=useState(false)
  const [post, setPost] = useState(false);
  const { SERVER_URL } = useContext(AuthDataContext);
 const navigate=useNavigate()

  const socket = io("http://localhost:4000");
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(SERVER_URL + "/api/user/currentuser", {
        withCredentials: true,
      });
      console.log(res.data.data)
      console.log("hello789")
        setUserData(res.data);
      
    } catch (error) {
      setUserData(null);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [SERVER_URL]);

  const getAllPost = useCallback(async () => {
    try {
      const res = await axios.get(SERVER_URL + "/api/post/get", {
        withCredentials: true,
      });
      console.log(res.data);
      setUserPostData(res.data);

    } catch (error) {
      console.error(error.message);
    }
  }, [SERVER_URL]);
  const getProfile = useCallback(async (username) => {
    try {
      const res = await axios.get(SERVER_URL + `/api/user/profile/${username}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setProfileData(res.data.data);
      navigate("/profile")
    } catch (error) {
      console.error(error.message);
    }
  }, [SERVER_URL]);
 useEffect(() => {
   if (!SERVER_URL) return; // don't call API if SERVER_URL is not defined yet
   fetchUserData();
   getAllPost();
 }, [SERVER_URL, fetchUserData, getAllPost]);


  return (
    <UserData.Provider
      value={{
        userData,
        setUserData,
        edit,
        socket,
        userPostData,
        getAllPost,setUserPostData,
        setEdit,
        post,
        getProfile,
        profileData,
        setProfileData,
        setPost,
        loading,
        refreshUserData: fetchUserData,
      }}
    >
      {children}
    </UserData.Provider>
  );
}

export default UserContext;
