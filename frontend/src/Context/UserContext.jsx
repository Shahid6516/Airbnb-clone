import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "https://airbnb-clone-backend-rjub.onrender.com";
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data.user);
      // console.log("Current user:", result.data.user);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser, serverUrl }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
