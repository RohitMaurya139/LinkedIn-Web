import { AuthDataContext } from "./authDataContext";

function AuthContext({ children }) {
  const SERVER_URL = "http://localhost:4000";
  const data = {
    SERVER_URL,
  };

  return (
    <AuthDataContext.Provider value={data}>{children}</AuthDataContext.Provider>
  );
}

export default AuthContext;
