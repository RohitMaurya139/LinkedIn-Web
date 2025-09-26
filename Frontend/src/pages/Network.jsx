import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AuthDataContext } from "../context/authDataContext";
import dp from "../assets/dp.webp";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Network = () => {
  const { SERVER_URL } = useContext(AuthDataContext);
  const [connections, setConnections] = useState([]);

  const handelGetStatus = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/api/connection/requests`, {
        withCredentials: true,
      });
      setConnections(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelAcceptConnection = async (connectionId) => {
    try {
      await axios.put(
        SERVER_URL + `/api/connection/accept/${connectionId}`,
        {},
        { withCredentials: true }
      );
      // Remove accepted connection from list
      setConnections(connections.filter((con) => con._id !== connectionId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelRejectConnection = async (connectionId) => {
    try {
      await axios.put(
        SERVER_URL + `/api/connection/reject/${connectionId}`,
        {},
        { withCredentials: true }
      );
      // Remove rejected connection from list
      setConnections(connections.filter((con) => con._id !== connectionId));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handelGetStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="pt-[30px] min-h-screen w-full bg-[#f1f1ee] flex flex-col items-center">
        {/* Invitation Header */}
        <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg mb-4 px-6 py-4 flex items-center text-2xl text-gray-600 font-semibold sticky top-[80px] z-30">
          Invitations ({connections.length})
        </div>
        {/* Connections List */}
        <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg px-6 py-8 flex flex-col gap-6 text-gray-700 overflow-y-auto">
          {connections.length === 0 ? (
            <div className="w-full text-center text-gray-400 font-medium py-12">
              No pending invitations.
            </div>
          ) : (
            connections.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between pb-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={req?.sender?.ProfilePic || dp}
                      alt="user profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900">
                      {req?.sender?.FirstName} {req?.sender?.LastName}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="py-2 px-4 rounded-full border border-red-600 text-red-600 text-md font-semibold hover:bg-red-700 hover:text-white transition"
                    onClick={() => handelRejectConnection(req._id)}
                  >
                    <RxCross2 />
                  </button>
                  <button
                    className="py-2 px-4 rounded-full border border-green-600 text-green-600 text-md font-semibold hover:bg-green-700 hover:text-white transition"
                    onClick={() => handelAcceptConnection(req._id)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Network;
