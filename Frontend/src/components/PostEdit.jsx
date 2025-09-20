import React, { useContext, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserData } from "../context/userDataContext";
import { AuthDataContext } from "../context/authDataContext";
import axios from "axios";

const PostEdit = () => {
  const { userData, post, setPost, setUserData } = useContext(UserData);
  const { SERVER_URL } = useContext(AuthDataContext);
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef();

  const handleClose = () => setPost(!post);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("content", content);
      if (attachment) {
        formData.append("attachment", attachment);
      }
      // Example endpoint, edit as needed
      const res = await axios.post(`${SERVER_URL}/api/posts/create`, formData, {
        withCredentials: true,
      });
      // Optionally update userData or posts in parent
      setUserData((prev) => ({
        ...prev,
        posts: [res.data.data, ...(prev.posts || [])],
      }));
      setContent("");
      setAttachment(null);
      setPost(false); // Close modal
    } catch (err) {
      console.error(err.message);
      alert("Failed to submit post!");
    }
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={handleClose}
        ></div>
        {/* Modal content */}
        <div className="relative w-[90%] max-w-[500px] max-h-[90vh] bg-white rounded-lg shadow-lg z-[300] flex flex-col px-3 overflow-auto">
          <div className="absolute left-2 top-2 text-gray-600 text-xl font-black p-1 rounded-lg">
            New Post
          </div>
          <button
            className="absolute right-2 top-2 bg-red-600 text-white p-1 rounded-lg hover:scale-105"
            onClick={handleClose}
          >
            <ImCross />
          </button>
          <form
            className="flex flex-col gap-4 items-center mt-2 justify-center py-8"
            onSubmit={handleSubmit}
          >
            <textarea
              className="w-[90%] h-32 px-4 py-2 border rounded-md focus:outline-none resize-none"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="w-[90%] flex flex-col items-center gap-3">
              {attachment && (
                <div className="text-xs text-gray-500">{attachment.name}</div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full h-[40px] mt-2 cursor-pointer rounded-full border px-8 border-[#0572b6] text-[#1892d9] hover:bg-[#1892d9] hover:text-white transition"
              >
                Add Attachment
              </button>
            </div>
            <div className="flex w-[90%] gap-3">
              <button className="w-full h-[40px] mt-2 cursor-pointer rounded-full border px-8 border-[#22b605] text-[#35d918] hover:bg-[#55d918] hover:text-white transition">
                Post
              </button>
              <button
                className="w-full h-[40px] mt-2 cursor-pointer rounded-full border px-8 border-[#b61a05] text-[#d91818] hover:bg-[#d91818] hover:text-white transition"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
