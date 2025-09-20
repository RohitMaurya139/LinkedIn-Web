import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import EditProfile from "../components/EditProfile";
import ProfileEdit from "../components/ProfileEdit";
import PostEdit from "../components/PostEdit";
import { UserData } from "../context/userDataContext";
import CreatePost from "../components/CreatePost";
import UserPost from "../components/UserPost";

const Home = () => {
   const { edit, post, userPost } = useContext(UserData); 
  return (
    <>
      {edit && <ProfileEdit />}
      {post && <PostEdit />}
      <Navbar />
      <div className="w-full min-h-screen bg-[#f1f1ee] pt-[85px] px-4 lg:px-10 flex flex-col lg:flex-row items-start justify-center gap-6">
        <aside className="w-full lg:w-1/4 min-h-[300px] bg-white rounded-md shadow-lg p-2  ">
          <EditProfile />
        </aside>

        <main className="w-full lg:w-1/2 min-h-[200px] flex flex-col gap-2 items-center justify-center pb-4">
          <CreatePost />
          {userPost.data.map((user) => {
            const { id, author, like, comment, image, description } = user;
            return (
              <UserPost
                key={id}
                id={id}
                author={author}
                like={like}
                comment={comment}
                image={image}
                description={description}
              />
            );
          })}
        </main>

        <section className="w-full lg:w-1/4 min-h-[300px] bg-white rounded-md shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Suggested Friends</h2>
          {/* Suggested friends content goes here */}
        </section>
      </div>
    </>
  );
};

export default Home;
