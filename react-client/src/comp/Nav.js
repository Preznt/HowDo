const Nav = () => {
  return (
    <div className="m-auto container flex">
      <a className="m-2.5" href="/">
        Home
      </a>
      <a className="m-2.5" href="/bbs">
        게시판
      </a>
      <a className="m-2.5" href="/contents">
        노하우
      </a>
      <a className="m-2.5" href="/creater">
        크리에이터
      </a>
      <a className="m-2.5 ml-auto" href="/login">
        로그인
      </a>
      <a className="m-2.5" href="/logout">
        로그아웃
      </a>
      <a className="m-2.5" href="/regist">
        회원가입
      </a>
    </div>
  );
};
export default Nav;
