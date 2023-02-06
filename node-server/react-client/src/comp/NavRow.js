import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDynamic from "./NavDynamic";
import { useAutoSearchContext } from "../context/AutoSearchProvider";
import { useUserContext } from "../context/UserContextProvider";
import MainButton from "./mainpage/MainButton";
import "../css/mainbar.css";
import { navRow, navRowMlAuto } from "../nav/classNames/ClassNames";

const NavRow = () => {
  const [nOpen, setNOpen] = useState(false);
  const navigate = useNavigate();
  const { currentSearch, onChange, onKeyUp, autoComplete } =
    useAutoSearchContext();
  const { userSession, logoutHandler } = useUserContext();
  const searchRef = useRef(null);

  const borderStyle = {
    padding: "1rem",
    borderBottomWidth: "2px",
    height: "40px",
    borderColor: "black",
    marginTop: "8px",
    marginBottom: "8px",
  };

  const onClick = async () => {
    if (currentSearch) {
      navigate(`/search/${currentSearch}`);
    } else {
      alert("검색어를 입력하세요");
      searchRef.current.focus();
    }
  };

  const pressEnter = async (e) => {
    if (e.keyCode === 13) {
      if (!currentSearch) {
        alert("검색어를 입력하세요");
        searchRef.current.focus();
      } else {
        navigate(`/search/${currentSearch}`);
      }
    }
  };

  const openClickHandler = () => {
    setNOpen(!nOpen);
    console.log(nOpen);
  };

  const autoCompleteView = autoComplete?.map((word, index) => {
    return (
      <div
        key={index}
        className="autocomplete cursor-pointer hover:bg-gray-300 rounded-lg"
      >
        {word}
      </div>
    );
  });

  return (
    <>
      <div className="mainbar flex bg-slate-400/90 top-0 left-0 right-0 mb-12 fixed pr-2 z-50">
        <div
          className="flex w-12 h-8 m-3 mr-0 content-center justify-center cursor-pointer "
          onClick={openClickHandler}
        >
          <img
            src="./image/burger.png"
            width="40px"
            height="50px"
            alt="burgermenu"
          />
        </div>
        <div className="ml-auto">
          <MainButton />
        </div>

        <div className="flex m-auto relative ">
          <input
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={pressEnter}
            value={currentSearch}
            ref={searchRef}
            className="bg-white outline-none rounded-full p-12 "
            style={borderStyle}
          />
          {autoComplete ? (
            <div className="absolute top-11 left-0 min-h-fit min-w-full bg-white border-black rounded-lg shadow-lg">
              {autoCompleteView}
            </div>
          ) : (
            ""
          )}

          <label className="mt-3 bg-white h-8 rounded-full cursor-pointer">
            <img
              onClick={onClick}
              src="./image/images.png"
              alt="searchImage"
              width="50px"
              height="30px"
              className="rounded-full"
            ></img>
          </label>
        </div>
        {userSession.username ? null : (
          <Link className={navRowMlAuto} to="/user/login">
            로그인
          </Link>
        )}
        {userSession.username ? (
          <div
            className={navRowMlAuto}
            onClick={() => {
              navigate(`/${userSession.nickname}`);
            }}
          >
            {userSession.nickname} 님의 페이지
          </div>
        ) : (
          <Link to="/regist" className={navRow}>
            회원가입
          </Link>
        )}
        {userSession.username ? (
          <div onClick={logoutHandler} className={navRow}>
            {userSession.nickname} 로그아웃
          </div>
        ) : null}
      </div>
      <NavDynamic nOpen={nOpen} setNOpen={setNOpen} />
    </>
  );
};

export default NavRow;
