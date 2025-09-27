import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
<<<<<<< HEAD
  const serverUrl = "https://airbnb-clone-backend-rjub.onrender.com";
=======
  // const serverUrl = "http://localhost:3000";
>>>>>>> 5658170ac5b8523a6cabc47967f7014d38a20f7c
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data.user);
      console.log("Current user:", result.data.user);
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
