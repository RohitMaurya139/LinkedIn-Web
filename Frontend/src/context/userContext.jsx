import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserData } from "./userDataContext.js";
import { AuthDataContext } from "./authDataContext.js";
import axios from "axios";

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [userPost,setUserPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit , setEdit]=useState(false)
  const [post, setPost] = useState(false);
  const { SERVER_URL } = useContext(AuthDataContext);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(SERVER_URL + "/api/user/currentuser", {
        withCredentials: true,
      });
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
      setUserPost(res.data)
    } catch (error) {
      console.error(error.message);
            setUserPost(null);

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
        userPost,
        getAllPost,setUserPost,
        setEdit,
        post,
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
