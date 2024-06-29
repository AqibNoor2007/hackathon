import { useState, createContext, useContext } from "react";
import { getSingleDoc } from "../firebase/apiFunctions";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async (uid) => {
    const data = await getSingleDoc("users", uid);
    console.log(data, "user data");
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;
