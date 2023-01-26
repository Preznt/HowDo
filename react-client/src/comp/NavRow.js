import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDynamic from "./NavDynamic";
import { useUserContext } from "../context/UserContextProvider";
import { UserSession } from "../data/UserSession";
const NavRow = () => {
  const [nOpen, setNOpen] = useState(false);
  const { userSession, logoutHandler } = useUserContext();
  const searchRef = useRef();

  const borderStyle = {
    padding: "1rem",
    borderBottomWidth: "2px",
    height: "40px",
    borderColor: "black",
    marginTop: "8px",
    marginBottom: "8px",
  };

  const openClickHandler = () => {
    setNOpen(!nOpen);
    console.log(nOpen);
  };

  return (
    <div className="flex bg-blue-900 top-0 left-0 right-0 mb-12 fixed ">
      <div
        className="flex w-12 h-8 m-3 mr-0 bg-inherit content-center justify-center cursor-pointer"
        onClick={openClickHandler}
      >
        <img
          src="./image/burger.png"
          width="40px"
          height="50px"
          alt="burgermenu"
        />
      </div>
      <div className="flex ml-auto">
        <input
          ref={searchRef.inputRef}
          className="bg-white outline-none rounded-full p-12"
          style={borderStyle}
          id="search"
        />
        <label className="mt-3 bg-white h-8 rounded-full" htmlFor="search">
          <img
            src="./image/images.png"
            alt="searchImage"
            width="50px"
            height="30px"
            className="rounded-full"
          ></img>
        </label>
      </div>
      {userSession.username ? null : (
        <div className="ml-auto mt-3 bg-white h-8">로그인</div>
      )}
      {userSession.username ? (
        <Link className="ml-auto mt-3 m-2 bg-white h-8" to="/mypage">
          {userSession.nickname} 님의 페이지
        </Link>
      ) : (
        <Link to="/regist" className="mt-3 bg-white h-8 ">
          회원가입
        </Link>
      )}
      {userSession.username ? (
        <div onClick={logoutHandler} className="mt-3 m-2 bg-white h-8 ">
          {userSession.nickname} 로그아웃
        </div>
      ) : null}
      <NavDynamic nOpen={nOpen} />
    </div>
  );
};

export default NavRow;
