import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

const NavCol = () => {
  const { userSession, logoutHandler } = useUserContext();
  return (
    <div className="flex flex-col w-20 bg-orange-400 h-full">
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/">
        <img src="./image/images.png" width="50px" height="30px" alt="home" />
        <h3>Home</h3>
      </Link>
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/bbs">
        게시판
      </Link>
      <Link
        className="m-2.5 p-2 ring-4 ring-white hover:bg-white"
        to="/contents"
      >
        노하우
      </Link>
      <Link
        className="m-2.5 p-2 ring-4 ring-white hover:bg-white"
        height="50px"
        to="/creater"
      >
        크리에이터
      </Link>
      <Link
        className="m-2.5 p-2 ring-4 ring-white hover:bg-white"
        to="/user/login"
      >
        로그인
      </Link>
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/logout">
        로그아웃
      </Link>
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/user">
        회원가입
      </Link>
    </div>
  );
};
export default NavCol;
