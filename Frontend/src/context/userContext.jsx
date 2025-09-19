import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserData } from "./userDataContext.js";
import { AuthDataContext } from "./authDataContext.js";
import axios from "axios";

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit , setEdit]=useState(false)
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

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserData.Provider
      value={{ userData, setUserData,edit , setEdit, loading, refreshUserData: fetchUserData }}
    >
      {children}
    </UserData.Provider>
  );
}

export default UserContext;
