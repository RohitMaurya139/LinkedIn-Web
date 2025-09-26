import React, { useContext, useEffect, useState } from 'react'
import { AuthDataContext } from '../context/authDataContext';
import axios from 'axios';
import { UserData } from '../context/userDataContext';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const socket = io("https://netwise-webapp.onrender.com", {
  withCredentials: true,
});
const ConnectionButton = ({userId}) => {
  const { SERVER_URL } = useContext(AuthDataContext);
  const [status, setStatus] = useState("")
  const navigate = useNavigate();
     const { getAllPost, userData } = useContext(UserData);
    const handelSendConnection=async () => {
        try {
            const res = await axios.post(
              SERVER_URL + `/api/connection/send/${userId}`,
              {},
              { withCredentials: true }
            );
            console.log(res.data)
        } catch (error) {
             console.error(error.message);
        }
    }
const handelGetStatus = async () => {
  try {
    const res = await axios.get(
      SERVER_URL + `/api/connection/getstatus/${userId}`,
      { withCredentials: true }
    );
    setStatus(res.data.status);
  } catch (error) {
    console.error(error.message);
  }
};
const handelRemoveConnection = async () => {
  try {
    const res = await axios.delete(
      SERVER_URL + `/api/connection/remove/${userId}`,
      { withCredentials: true }
    );
    console.log(res.message)

  } catch (error) {
    console.error(error.message);
  }
};
    useEffect(() => {
      socket.emit("register", userData.data._id);
      handelGetStatus();

      const handleStatusUpdate = ({ updateUserId, newStatus }) => {
        if (updateUserId.toString() === userId.toString()) {
          setStatus(newStatus);
        }
      };

      socket.on("statusUpdate", handleStatusUpdate);
      return () => socket.off("statusUpdate", handleStatusUpdate);
    }, [userId, userData]);

  
  
  const handelClick = async () => {
    if (status == "disconnect") {
      await handelRemoveConnection()
    } else if (status == "received") {
       navigate("/network")
    } else {
       await handelSendConnection();
    }
  }
    
  return (
    <div>
      <button
        className=" w-fit py-1 cursor-pointer rounded-full border border-[#006699] px-4 text-[#0372a1] hover:bg-[#006699] hover:text-white transition flex items-center justify-center gap-2"
        onClick={handelClick} disabled={status=="pending"}
      >
        {status}
      </button>
    </div>
  );
}

export default ConnectionButton
