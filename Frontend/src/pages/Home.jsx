import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EditProfile from "../components/EditProfile";
import ProfileEdit from "../components/ProfileEdit";
import PostEdit from "../components/PostEdit";
import dp from "../assets/dp.webp";
import { UserData } from "../context/userDataContext";
import CreatePost from "../components/CreatePost";
import UserPost from "../components/UserPost";
import { AuthDataContext } from "../context/authDataContext";
import axios from "axios";

const Home = () => {
  const { edit, post, userPostData, getProfile } = useContext(UserData);
  const[suggestedUsers,setSuggestedUsers] =useState([])
   const { SERVER_URL } = useContext(AuthDataContext);
  const getSuggestedUser = async (user) => {
    try {
      const res = await axios.get(SERVER_URL + "/api/user/suggested", {
        withCredentials: true,
      });
      console.log(res.data.data)
      setSuggestedUsers(res.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getSuggestedUser()
  },[])
  return (
    <>
      {edit && <ProfileEdit />}
      {post && <PostEdit />}
      <Navbar />
      <div className="w-full min-h-screen bg-[#f1f1ee]   px-4 lg:px-10 flex flex-col lg:flex-row items-start justify-center gap-6">
        <aside className="w-full lg:w-1/4 min-h-[300px] bg-white rounded-md shadow-lg p-2 mt-[10px] ">
          <EditProfile />
        </aside>

        <main className="w-full lg:w-1/2 min-h-[200px] flex flex-col gap-2 items-center justify-center pb-4 mt-[10px] ">
          <CreatePost />
          {userPostData?.data?.length > 0 ? (
            userPostData.data.map((user) => {
              const {
                _id,
                author,
                like,
                comment,
                image,
                description,
                createdAt,
              } = user;
              return (
                <UserPost
                  key={_id}
                  id={_id}
                  author={author}
                  like={like}
                  comment={comment}
                  image={image}
                  description={description}
                  createdAt={createdAt}
                />
              );
            })
          ) : (
            <p className="text-gray-500 mt-4">No posts available.</p>
          )}
        </main>

        <section className="w-full lg:w-1/4 min-h-[300px] bg-white rounded-md shadow-lg p-6 hidden lg:flex flex-col mt-[10px] ">
          <h2 className="text-xl font-semibold mb-4">Suggested Friends</h2>
          {suggestedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-0"
              onClick={() => getProfile(user.UserName)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={user.ProfilePic || dp}
                  alt="user Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {user.FirstName} {user.LastName}
                </h2>
                <h4 className="text-gray-600 text-sm">{user.headline}</h4>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
export default Home