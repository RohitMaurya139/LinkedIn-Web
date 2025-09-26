import { AuthDataContext } from "./authDataContext";

function AuthContext({ children }) {
  const SERVER_URL = "https://netwise-webapp.onrender.com";
  const data = {
    SERVER_URL,
  };

  return (
    <AuthDataContext.Provider value={data}>{children}</AuthDataContext.Provider>
  );
}

export default AuthContext;
