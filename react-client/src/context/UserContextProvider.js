import { createContext, useContext, useState } from "react";
import { User } from "../models/User";
import { fetchJoin } from "../service/auth.service";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [joinUser, setJoinUser] = useState(new User());

  const exeJoin = () => {
    fetchJoin(joinUser);
  };

  const props = {
    joinUser,
    setJoinUser,
    exeJoin,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
