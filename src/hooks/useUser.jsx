import { useState, createContext, useContext } from "react";
import { getSingleDoc } from "../firebase/apiFunctions";
import { useEffect } from "react";
import { getToken } from "../components/lib";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async (uid) => {
    const data = await getSingleDoc("users", uid);
    console.log(data, "user data");
  };

  useEffect(() => {
    const uid = getToken();
    if (uid) {
      getUser(uid);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;
