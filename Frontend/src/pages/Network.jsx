import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { AuthDataContext } from '../context/authDataContext';
import dp from "../assets/dp.webp";
import { FaCheck } from "react-icons/fa6";

import { RxCross2 } from "react-icons/rx";


const Network = () => {
  const { SERVER_URL } = useContext(AuthDataContext);
  const [connections,setConnections]=useState([])
  const handelGetStatus = async () => {
    try {
      const res = await axios.get(
        SERVER_URL + `/api/connection/requests`,
        { withCredentials: true }
      );
       setConnections(res.data.data)
    } catch (error) {
      console.error(error.message);
    }
  };
  const handelAcceptConnection = async (connectionId) => {
    try {
      const res = await axios.put(
        SERVER_URL + `/api/connection/accept/${connectionId}`,{},
        {
          withCredentials: true,
        }
      );
      setConnections(connections.filter((con)=>con._id==connectionId))
    } catch (error) {
      console.error(error.message);
    }
  };
  const handelRejectConnection = async (connectionId) => {
    try {
      const res = await axios.put(
        SERVER_URL + `/api/connection/reject/${connectionId}`,{},
        {
          withCredentials: true,
        }
      );
       setConnections(connections.filter((con) => con._id == connectionId));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    handelGetStatus()
  },[connections])
  return (
    <div className="w-screen min-h-screen bg-[#f1f1ee] px-8 lg:px-48 pt-24 pb-8 flex flex-col items-center gap-6">
      <Navbar />
      <div className="w-full h-[100px] bg-white p-6 rounded-lg shadow-lg flex items-center text-2xl text-gray-600 font-semibold">
        Invitation ({connections.length})
      </div>
      <div className="w-[70%] bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6 text-gray-700">
        {connections.map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between pb-2 border-b-2 border-gray-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={req?.sender?.ProfilePic || dp}
                  alt="user Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-gray-900">
                  {req?.sender?.FirstName} {req?.sender?.LastName}
                </h2>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="py-2 px-2 rounded-full border border-red-600 text-red-600 text-md font-bold hover:bg-red-700 hover:text-white transition duration-300"
                onClick={()=>handelRejectConnection(req._id)}
              >
                <RxCross2 />
              </button>
              <button
                className="py-2 px-2 rounded-full border border-green-600 text-green-600 text-md font-bold hover:bg-green-700 hover:text-white transition duration-300"
                onClick={()=>handelAcceptConnection(req._id)}
              >
                <FaCheck />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Network