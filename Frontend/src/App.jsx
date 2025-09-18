import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useContext } from "react";
import { UserData } from "./context/userDataContext.js";

function App() {
  const { userData, loading } = useContext(UserData);

  if (loading) {
    // Show loading spinner or blank while user data is loading
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
