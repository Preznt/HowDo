import "../css/Nav.css";
const NavDynamic = ({ nOpen }) => {
  // console.log(nOpen);
  return (
    <div
      className={
        nOpen
          ? "absolute w-48 z-50 top-14 -left-24 transition-all duration-700 translate-x-20 bg-black text-white h-screen"
          : "absolute top-14 -left-24 z_1"
      }
    >
      <div>
        <div>1번 메뉴</div>
      </div>
      <div>
        <div>2번 메뉴</div>
      </div>
      <div>
        <div>3번 메뉴</div>
      </div>
      <div>
        <div>4번 메뉴</div>
      </div>
    </div>
  );
};
export default NavDynamic;
