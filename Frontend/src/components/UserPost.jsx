import React, { useRef, useEffect, useState, useContext } from "react";
import dp from "../assets/dp.webp";
import moment from "moment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // filled like icon added
import { FaRegComments } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/authDataContext.js";
import { UserData } from "../context/userDataContext.js";

const UserPost = ({
  id,
  author,
  like = [],
  comment = [],
  image,
  description,
  createdAt,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const descRef = useRef(null);

  const { getAllPost } = useContext(UserData);
  const { SERVER_URL, userId } = useContext(AuthDataContext); // Make sure userId is provided here

  // State for like status and count
  const [liked, setLiked] = useState(like.includes(userId));
  const [likeCount, setLikeCount] = useState(like.length);

  const handleLike = async () => {
    try {
      await axios.post(
        SERVER_URL + `/api/post/like/${id}`,
        {},
        { withCredentials: true }
      );
      // Toggle liked state and update count
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
      // Optional: refresh all posts from server
      // getAllPost();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (descRef.current) {
      setTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [description]);

  return (
    <div className="max-w-xl mx-auto my-2 bg-white rounded-lg shadow-md p-4">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={author?.ProfilePic || dp}
            alt={`${author?.FirstName || "User"} Profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="font-semibold text-lg text-gray-900">
            {author?.FirstName} {author?.LastName}
          </h2>
          <p className="text-sm text-gray-600">{author?.headline}</p>
          <p className="text-sm text-gray-600">{moment(createdAt).fromNow()}</p>
        </div>
      </div>

      {/* Post Description with truncation */}
      <div>
        <p
          ref={descRef}
          className={`text-gray-800 whitespace-pre-wrap overflow-hidden transition-all ${
            !expanded ? "line-clamp-3" : ""
          }`}
          style={{ maxHeight: expanded ? "none" : "4.5rem" }}
        >
          {description}
        </p>
        {truncated && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 hover:underline text-sm font-semibold cursor-pointer"
          >
            {expanded ? "See less" : "read more"}
          </button>
        )}
      </div>

      {/* Post Image if any */}
      {image && (
        <div className="rounded-lg w-full overflow-hidden mb-4">
          <img src={image} alt="post visual" className="w-full object-cover" />
        </div>
      )}

      {/* Likes and Comments count */}
      <div className="flex justify-between text-gray-600 text-sm pt-3">
        <div className="flex gap-1 items-center justify-center">
          {liked ? <AiFillLike className="text-blue-600" /> : <AiOutlineLike />}
          <div className="font-semibold">{likeCount}</div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <FaRegComments />
          <div className="font-semibold">{comment.length}</div>
        </div>
      </div>

      {/* Actions: Like and Comment Buttons */}
      <div className="flex gap-8 justify-start text-gray-600 text-sm border-t border-gray-200 pt-3">
        <div
          className="cursor-pointer flex gap-1 items-center justify-center"
          onClick={handleLike}
        >
          {liked ? <AiFillLike className="text-blue-600" /> : <AiOutlineLike />}
          <div className="font-semibold">{liked ? "Liked" : "Like"}</div>
        </div>
        <div className="cursor-pointer flex gap-1 items-center justify-center">
          <FaRegCommentDots />
          <div className="font-semibold">Comment</div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
