import { Link } from "react-router-dom";
import "../image/images.png";

const Nav = () => {
  const borderStyle = {
    padding: "0",
    borderBottomWidth: "2px",
    height: "45px",
    borderColor: "black",
    marginTop: "8px",
  };
  return (
    <div className="m-auto container flex bg-blue-600 ">
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/">
        Home
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
        to="/creater"
      >
        크리에이터
      </Link>
      <label className="ml-auto w-14 bg-white rounded-full">
        <img src="../image/images.png" alt="searchImage"></img>
      </label>
      <input className="bg-white outline-none" style={borderStyle} />
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/login">
        로그인
      </Link>
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/logout">
        로그아웃
      </Link>
      <Link className="m-2.5 p-2 ring-4 ring-white hover:bg-white" to="/regist">
        회원가입
      </Link>
    </div>
  );
};
export default Nav;
