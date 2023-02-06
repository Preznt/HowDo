import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { navCol } from "../nav/classNames/ClassNames";

const NavCol = () => {
  const { userSession, logoutHandler } = useUserContext();
  return (
    <div className="flex flex-col top-15 min-w-fit bg-slate-400/90 h-screen p-1 content-center fixed">
      <Link
        className="mt-6 w-full bg-inherit text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded text-center ring-1 ring-yellow-400"
        to="/"
      >
        <img
          className="m-auto"
          src="./image/images.png"
          width="50px"
          height="30px"
          alt="home"
        />
        <h3>Home</h3>
      </Link>
      <Link className={navCol} to="/community">
        게시판
      </Link>
      <Link className={navCol} to="/contents">
        노하우
      </Link>
      <Link className={navCol} height="50px" to="/creater">
        크리에이터
      </Link>
      {userSession.username ? (
        <Link
          className="mt-12 max-w-[112px] bg-inherit text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded text-center ring-1 ring-yellow-400"
          onClick={logoutHandler}
          to="#"
        >
          {userSession.nickname} 님 로그아웃
        </Link>
      ) : (
        <Link className={navCol} to="/user/login">
          로그인
        </Link>
      )}
      {userSession.username ? null : (
        <Link className={navCol} to="/user">
          회원가입
        </Link>
      )}
    </div>
  );
};
export default NavCol;
