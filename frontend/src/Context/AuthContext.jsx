import { createContext, useState } from "react";

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:3000";

  const [loading, setLoading] = useState(false)
  const value = {
    serverUrl,
    loading, setLoading
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;
