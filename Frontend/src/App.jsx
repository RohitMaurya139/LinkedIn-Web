import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useContext } from "react";
import { UserData } from "./context/userDataContext.js";
import Network from "./pages/Network.jsx";
import Profile from "./pages/Profile.jsx";
import Shimmer from "./components/Shimmer.jsx";
import Notification from "./pages/Notification.jsx";

function App() {
  const { userData, loading } = useContext(UserData);

  if (loading) {
    // Show loading spinner or blank while user data is loading
    return (
      <div className="space-y-2 justify-center items-center flex">
        <Shimmer className="w-3/4 h-4" />
        <Shimmer className="w-full h-4" />
        <Shimmer className="w-5/6 h-4" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/network"
        element={userData ? <Network /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/notification"
        element={userData ? <Notification /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}

export default App;
