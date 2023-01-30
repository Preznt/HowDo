import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

const NavCol = () => {
  const { userSession, logoutHandler } = useUserContext();
  return (
    <div className="flex flex-col w-28 bg-orange-400 h-screen p-1">
      <Link
        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/"
      >
        <img src="./image/images.png" width="50px" height="30px" alt="home" />
        <h3>Home</h3>
      </Link>
      <Link
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/bbs"
      >
        게시판
      </Link>
      <Link
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="/contents"
      >
        노하우
      </Link>
      <Link
        className="mt-6 w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        height="50px"
        to="/creater"
      >
        크리에이터
      </Link>
      {userSession.username ? (
        <Link
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logoutHandler}
        >
          {userSession.nickname} 님로그아웃
        </Link>
      ) : (
        <Link
          className="mt-6  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/user/login"
        >
          로그인
        </Link>
      )}
      {userSession.username ? null : (
        <Link
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/user"
        >
          회원가입
        </Link>
      )}
    </div>
  );
};
export default NavCol;
