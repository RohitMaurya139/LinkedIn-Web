import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AuthDataContext } from "../context/authDataContext";
import dp from "../assets/dp.webp";
import { RxCross2 } from "react-icons/rx";

const Notification = () => {
  const { SERVER_URL } = useContext(AuthDataContext);
  const [notificationData, setNotificationData] = useState([]);

  const getNotification = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/api/notification/get", {
        withCredentials: true,
      });
      console.log(res.data.data)
      setNotificationData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
   const deleteNotification = async (id) => {
     try {
       const res = await axios.delete(SERVER_URL + `/api/notification/delete/${id}`, {
         withCredentials: true,
       });
     await getNotification()
     } catch (error) {
       console.log(error.message);
     }
   };
   const deleteAllNotification = async () => {
     try {
       const res = await axios.delete(SERVER_URL + `/api/notification/clear`, {
         withCredentials: true,
       });
     await getNotification()
     } catch (error) {
       console.log(error.message);
     }
   };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-[30px] min-h-screen w-full bg-[#f1f1ee] flex flex-col items-center">
        {/* Notification Header */}
        <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg mb-4 px-6 py-4 flex items-center justify-between text-2xl text-gray-600 font-semibold sticky top-[40px] z-30">
          <div> Notification ({notificationData.length})</div>
          <div className="text-sm text-gray-700 font-semibold cursor-pointer" onClick={deleteAllNotification}>Clear All</div>
        </div>
        {/* Notifications Container */}
        <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg px-6 py-8 flex flex-col gap-6 text-gray-700 overflow-y-auto">
          {notificationData.length === 0 ? (
            <div className="w-full text-center text-gray-400 font-medium py-12">
              No pending Notification.
            </div>
          ) : (
            notificationData.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between pb-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {/* User Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src={req?.relatedUser?.ProfilePic || dp}
                      alt="user profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* User & Notification Text */}
                  <div className="max-w-xs">
                    <h2 className="font-semibold text-md text-gray-700 ">
                      <span className="text-[#007cb5]">
                        {req?.relatedUser?.FirstName}{" "}
                        {req?.relatedUser?.LastName}
                      </span>{" "}
                      <span>
                        {req.type === "like"
                          ? "Liked Your Post"
                          : req.type === "comment"
                          ? "Commented on your Post"
                          : "Accepted Your Connection Request"}
                      </span>
                    </h2>
                  </div>
                </div>
                {/* Post Image and Description */}
                {req?.relatedPost?.image ? (
                  <div className="w-[80px] h-[80px] flex flex-col items-center flex-shrink-0">
                    <img
                      src={req?.relatedPost?.image}
                      alt="post"
                      className="w-full h-16 object-cover rounded-md mb-1"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 max-w-[280px] truncate overflow-hidden whitespace-nowrap">
                    {req?.relatedPost?.description || ""}
                  </p>
                )}
                <div className="w-fit cursor-pointer" onClick={()=>deleteNotification(req._id)}>
                  <RxCross2 />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
