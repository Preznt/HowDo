import { NavLink } from "react-router-dom";

const BoardNav = ({ data }) => {
  console.log(data);

  // 그룹별로
  const BoardItem = () => {
    return data.map((item) => {
      if (item.b_group_code === "B1") {
        return (
          <NavLink className="board-link" to={`/community/${item.b_eng}`}>
            {item.b_kor}
          </NavLink>
        );
      } else {
        return (
          <NavLink className="board-link" to={`/community/${item.b_eng}`}>
            {item.b_kor}
          </NavLink>
        );
      }
    });
  };
  return (
    <nav className="board-nav w-full flex gap-5 p-5">
      <BoardItem />
    </nav>
  );
};

export default BoardNav;
