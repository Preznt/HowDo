import "../css/Nav.css";
const Nav_dynamic = ({ nOpen }) => {
  console.log(nOpen);
  return (
    <div
      className={
        nOpen
          ? "container translate-x-20 ease-in-out z-50 top-0 left-0 "
          : "absolute container top-0 left-0 z_1"
      }
    >
      <div>
        <img />
        <div>1번 메뉴</div>
      </div>
      <div>
        <img />
        <div>2번 메뉴</div>
      </div>
      <div>
        <img />
        <div>3번 메뉴</div>
      </div>
      <div>
        <img />
        <div>4번 메뉴</div>
      </div>
    </div>
  );
};
export default Nav_dynamic;
