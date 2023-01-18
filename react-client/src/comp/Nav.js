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
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/">
        Home
      </a>
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/bbs">
        게시판
      </a>
      <a
        className="m-2.5 p-2 ring-4 ring-white hover:bg-white"
        href="/contents"
      >
        노하우
      </a>
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/creater">
        크리에이터
      </a>
      <label className="ml-auto w-14 bg-white rounded-full">
        <img src="../image/images.png" alt="searchImage"></img>
      </label>
      <input className="bg-white outline-none" style={borderStyle} />
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/login">
        로그인
      </a>
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/logout">
        로그아웃
      </a>
      <a className="m-2.5 p-2 ring-4 ring-white hover:bg-white" href="/regist">
        회원가입
      </a>
    </div>
  );
};
export default Nav;
