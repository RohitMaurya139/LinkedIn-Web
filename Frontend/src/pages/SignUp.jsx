import React, { useState } from "react";
import logo from "../assets/logo3.PNG";
import view from "../assets/view.png";
import { AuthDataContext }  from "../context/authDataContext";
import hide from "../assets/hide.png";
import {UserData} from "../context/userDataContext.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useContext } from "react";
const SignUp = () => {
    const [show, setShow] = useState(false)
  const { SERVER_URL } = useContext(AuthDataContext)
   const { refreshUserData } = useContext(UserData);
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")
    const [userName, setUserName]=useState("")
    const [email, setEmail]=useState("")
  const [password, setPassword] = useState("")
  // const [userData, setUserData] = useState(UserData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate=useNavigate()
    const handelShow = () => {
        setShow(!show)
    }
    const handelSignUp = async (e) => {
      e.preventDefault();
      setLoading(true)
        try {
            const res = await axios.post(SERVER_URL
              +"/api/auth/signup",
              { FirstName:firstName, LastName:lastName, UserName:userName, Email:email,Password:password },
              { withCredentials: true }
            );
          setLoading(false)
          await refreshUserData()
          // setUserData(res.data)
          navigate("/")
          setFirstName("")
          setLastName("")
          setUserName("")
          setEmail("")
          setPassword("")
        } catch (error) {
          setLoading(false);
            setError(error.response.data.message)
            console.error(error.message)
        }
}
  return (
    <>
      <div className="w-full h-screen bg-white flex flex-col items-center justify-start px-4">
        {/* Logo fixed top-left */}
        <div className=" w-full top-0 left-0 px-6 py-3 lg:px-10 lg:py-6">
          <img src={logo} alt="logo" className="w-[100px]  lg:w-[200px] " />
        </div>

        {/* Form container */}
        <form className="w-full max-w-md bg-white lg:shadow-xl rounded-lg p-8 space-y-6 ">
          <h2 className="text-3xl font-bold text-center text-[#006699]">
            Create an Account
          </h2>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
          />
          <div className="w-full  border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699] relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
            />
            <span
              className="absolute right-3 top-3 text-[#006699] font-semibold cursor-pointer  hover:text-[#004b70] transition"
              onClick={handelShow}
            >
              {show ? (
                <img src={view} className="w-5" />
              ) : (
                <img src={hide} className="w-5" />
              )}
            </span>
          </div>
          {error && (
            <p className="text-sm text-center text-red-600 font-semibold">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            onClick={handelSignUp}
            className="w-full py-3 bg-[#006699] text-white font-semibold rounded-full hover:bg-[#004b70] transition"
          >
            Sign Up
          </button>
          <Link to={"/login"}>
            <p className="text-center">
              Already have an account?{" "}
              <span className="text-[#006699] font-bold cursor-pointer  hover:text-[#004b70] transition">
                {" "}
                {loading ? "Loading" : "Sign In"}
              </span>{" "}
            </p>
          </Link>
          <p className="text-center text-sm mt-2 font-semibold">
            Made with <span className="text-red-600">❤</span> by{" "}
            <Link
              to={"https://portfolio-rohit-maurya-webdev.netlify.app/"}
              className="text-[#006699] font-bold cursor-pointer  hover:text-[#004b70] transition"
            >
              Rohit Maurya
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
