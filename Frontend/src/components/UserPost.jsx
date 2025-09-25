// UserPost.jsx
import React, { useRef, useEffect, useState, useContext } from "react";
import dp from "../assets/dp.webp";
import moment from "moment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/authDataContext.js";
import { UserData } from "../context/userDataContext.js";
import { LuSendHorizontal } from "react-icons/lu";
import ConnectionButton from "./ConnectionButton.jsx";
import { io } from 'socket.io-client'

const socket=io("http://localhost:4000")
const UserPost = ({
  id,
  author,
  like,
  comment,
  image,
  description,
  createdAt,
}) => {

  const [showCommentPosting, setShowCommentPosting] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(comment || []);
  const { getAllPost, userData, getProfile, profileData, setProfileData } =
    useContext(UserData);
  const { SERVER_URL, userId } = useContext(AuthDataContext);
 const [more,setMore]=useState(false)
  const [likes, setLikes] = useState(like || []);
  const [commentCount, setCommentCount] = useState(comment.length);

  // Sync liked status from likes array
 

  // Handle like API
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${SERVER_URL}/api/post/like/${id}`,
        {},
        { withCredentials: true }
      );
    
      setLikes(res.data.data.like);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle comment API
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${SERVER_URL}/api/post/comment/${id}`,
        { content: commentContent },
        { withCredentials: true }
      );
      setComments(res.data.data.comment);
      setCommentCount(res.data.data.comment.length);
      setCommentContent("");
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    socket.on("likeUpdated", ({ postId, likes }) => {
      if (postId == id) {
        setLikes(likes)
      }
    })
      socket.on("commentAdded", ({ postId, comm }) => {
        if (postId == id) {
          setComments(comm);
        }
      });
      return () => {
        socket.off("likeUpdated")
        socket.off("commentAdded");
      }
    
},[id])
  useEffect(() => {
    getAllPost()
  },[likes,setLikes,comments])
  return (
    <div className="w-full mx-auto my-2 bg-white rounded-lg shadow-md p-4">
      {/* Post Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center mb-4">
          <div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
            onClick={() => getProfile(author?.UserName)}
          >
            <img
              src={author?.ProfilePic || dp}
              alt="user Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2
              className="font-semibold text-lg text-gray-900 cursor-pointer"
              onClick={() => getProfile(author?.UserName)}
            >
              {author?.FirstName} {author?.LastName}
            </h2>
            <p className="text-sm text-gray-600">{author?.headline}</p>
            <p className="text-sm text-gray-600">
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
        {userData.data._id != author._id && (
          <div>
            <ConnectionButton userId={author?._id} />
            {/*problem may arise bcz _id not populated*/}
          </div>
        )}
      </div>
      {/* Post Description */}
      <div>
        <div
          className={`w-full text-gray-700 text-base px-3 my-1 transition-max-height duration-300 ease-in-out ${
            more ? "max-h-full" : "max-h-24 overflow-hidden"
          }`}
        >
          {description}
        </div>
        <div
          className="text-blue-600 text-sm px-3 mb-1 font-semibold cursor-pointer select-none hover:underline"
          onClick={() => setMore(!more)}
        >
          {more ? "read less..." : "read more..."}
        </div>
      </div>

      {/* Post Image */}
      {image && (
        <div className="rounded-lg w-full overflow-hidden mb-4">
          <img src={image} alt="post visual" className="w-full object-cover" />
        </div>
      )}
      {/* Likes and Comments count */}
      <div className="flex justify-between text-gray-600 text-sm pt-3 mb-2">
        <div className="flex gap-1 items-center justify-center">
          <div className="text-blue-600">
            {likes.includes(userData.data._id) ? (
              <AiFillLike size={20} />
            ) : (
              <AiOutlineLike size={20} />
            )}
          </div>
          <div className="font-semibold">{likes.length}</div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <div className="font-semibold">{commentCount}</div>
          <FaRegComments size={20} />
        </div>
      </div>
      {/* Actions: Like & Comment buttons */}
      <div className="flex gap-8 justify-start text-gray-600 text-md border-t border-gray-400 pt-1 mb-3">
        <div
          className="cursor-pointer flex gap-1 items-center justify-center select-none"
          onClick={handleLike}
        >
          <div className="text-blue-600">
            {likes.includes(userData.data._id) ? (
              <AiFillLike size={20} />
            ) : (
              <AiOutlineLike size={20} />
            )}
          </div>
          <div className="font-semibold">
            {likes.includes(userData.data._id) ? "Liked" : "Like"}
          </div>
        </div>
        <div
          className="cursor-pointer flex gap-1 items-center justify-center select-none"
          onClick={() => setShowCommentPosting(!showCommentPosting)}
        >
          <FaRegCommentDots size={20} />
          <div className="font-semibold">Comment</div>
        </div>
      </div>
      {/* Comment Form */}
      {showCommentPosting && (
        <div>
          <form
            onSubmit={handleComment}
            className="flex items-center gap-3 mt-4 ml-5 border-b-2 border-gray-300"
          >
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Leave a Comment"
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-[40px] h-[40px] text-blue-500 hover:text-blue-700 font-bold text-lg transition cursor-pointer"
            >
              <LuSendHorizontal />
            </button>
          </form>
          <div className="mt-5">
            {comments.map((com) => (
              <div
                key={com?.user?._id || com.id}
                className="flex items-start justify-start mb-4"
              >
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={com?.user?.ProfilePic || dp}
                      alt={`${com?.user?.FirstName || "User"} Profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-col ">
                    <div>
                      <h2 className="font-semibold text-sm text-gray-900">
                        {com?.user?.FirstName} {com?.user?.LastName}
                      </h2>
                    </div>
                    <div class="border-b-1  border-gray-300">{com.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPost;
