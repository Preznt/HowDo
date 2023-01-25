import { createContext, useContext, useState } from "react";
import { Login } from "../data/Login";
import { UserSession } from "../data/UserSession";
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [login, setLogin] = useState(new Login());
  const [userSession, setUserSession] = useState(new UserSession());

  const props = {
    login,
    setLogin,
    userSession,
    setUserSession,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
