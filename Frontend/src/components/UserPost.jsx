import React, { useState, useRef, useEffect } from "react";
import dp from "../assets/dp.webp";

const UserPost = ({ id, author, like, comment, image, description }) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      setTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [description]);

  return (
    <div
      key={id}
      className="max-w-xl mx-auto my-2 bg-white rounded-lg shadow-md p-4"
    >
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
        </div>
      </div>

      {/* Post Description with truncation */}
      <div>
        <p
          ref={descRef}
          className={`text-gray-800  whitespace-pre-wrap overflow-hidden transition-all ${
            !expanded ? "line-clamp-3" : ""
          }`}
          style={{ maxHeight: expanded ? "none" : "4.5rem" }} // 3 lines ~ 1.5rem*3
        >
          {description}
        </p>
        {truncated && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 hover:underline text-sm font-semibold cursor-pointer"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* Post Image if any */}
      {image && (
        <div className="rounded-lg overflow-hidden mb-4">
          <img
            src={image}
            alt="post visual"
            className="w-full object-contain"
          />
        </div>
      )}

      {/* Post Actions: Likes and Comments */}
      <div className="flex justify-between text-gray-600 text-sm border-t border-gray-200 pt-3">
        <div className="cursor-pointer">
          <span className="font-semibold">{like?.length || 0}</span> Likes
        </div>
        <div className="cursor-pointer">
          <span className="font-semibold">{comment?.length || 0}</span> Comments
        </div>
      </div>
    </div>
  );
};

export default UserPost;
