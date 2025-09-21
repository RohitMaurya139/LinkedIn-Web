import React, { useContext, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserData } from "../context/userDataContext";
import { AuthDataContext } from "../context/authDataContext";
import { MdInsertPhoto } from "react-icons/md";
import axios from "axios";

const PostEdit = () => {
  const { userData, post, setPost, setUserData } = useContext(UserData);
  const { SERVER_URL } = useContext(AuthDataContext);
  const [frontendImage,setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);
  
  const fileInputRef = useRef();

  const handleClose = () => setPost(!post);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0]
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file))
    }
  };

  const handleUploadPost = async (e) => {
    e.preventDefault();
    try {
      setPosting(true)
      let formData = new FormData();
      formData.append("description", description);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const res = await axios.post(`${SERVER_URL}/api/post/create`, formData, {
        withCredentials: true,
      });
      console.log(res.data)
      setPosting(false)
      setDescription("")
      setFrontendImage(null);
      setPost(false);
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
          className="absolute inset-0 bg-black/60"
          onClick={handleClose}
        ></div>
        {/* Modal content */}
        <div className="relative w-full max-w-[480px] bg-white rounded-xl shadow-2xl z-[300] px-6 py-8 flex flex-col gap-4 mt-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 text-lg font-semibold">
              New Post
            </span>
            <button
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
              onClick={handleClose}
              aria-label="Close"
            >
              <ImCross size={18} />
            </button>
          </div>
          <form className="flex flex-col gap-6">
            <textarea
              className="w-full min-h-[200px]  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  text-gray-700 transition resize-none overflow-auto"
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="flex flex-col gap-2">
              {frontendImage && (
                <div className="text-xs text-gray-600 ml-1">
                  <img
                    src={frontendImage || ""}
                    className="w-20 h-20 rounded-lg"
                  />
                </div>
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
                className="flex items-center gap-2 bg-[#f3f3f3] hover:bg-[#e7e7e7] px-4 py-2 rounded-lg text-[#006699] font-medium transition cursor-pointer"
              >
                <MdInsertPhoto size={28} className="mr-2" />{" "}
                <span>Add Photo</span>
              </button>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#22b605] text-white font-medium hover:bg-[#35d918] shadow transition cursor-pointer"
                onClick={handleUploadPost}
              >
                {posting?"Posting...":"Post"}
              </button>
              <button
                type="button"
                className="px-5 py-2 rounded-full bg-[#ffd3d3] text-[#c43828] hover:bg-[#e94444] hover:text-white font-medium cursor-pointer shadow transition"
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
 