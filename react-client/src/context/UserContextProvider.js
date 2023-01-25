import { createContext, useContext, useState, useRef } from "react";
import { User } from "../data/User";
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
  const [error, setError] = useState({});
  const [userSession, setUserSession] = useState(new UserSession());
  const usernameRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const inputRef = { usernameRef, nicknameRef, passwordRef, rePasswordRef };

  const exeJoin = async () => {
    const result = await fetchJoin(joinUser);
    // if (result?.CODE === "REQ_USERNAME") {
    //   alert(`${result.MESSAGE}`);
    //   usernameRef.current.focus();
    // } else if (result?.CODE === "REQ_USERNAME") {
    //   alert(`다시 입력`);
    //   usernameRef.current.focus();
    // }
    return result;
  };

  const props = {
    joinUser,
    setJoinUser,
    exeJoin,
    inputRef,
    error,
    setError,
    login,
    setLogin,
    userSession,
    setUserSession,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
