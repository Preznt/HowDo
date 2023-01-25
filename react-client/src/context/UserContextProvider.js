import { createContext, useContext, useState } from "react";
import { User } from "../models/User";
import { fetchJoin } from "../service/auth.service";
import { Login } from "../data/Login";
import { UserSession } from "../data/UserSession";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [joinUser, setJoinUser] = useState(new User());
  const [login, setLogin] = useState(new Login());
  const [userSession, setUserSession] = useState(new UserSession());

  const exeJoin = () => {
    fetchJoin(joinUser);
  };

  const props = {
    joinUser,
    setJoinUser,
    exeJoin,
    login,
    setLogin,
    userSession,
    setUserSession,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
