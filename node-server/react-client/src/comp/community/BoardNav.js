import { NavLink } from "react-router-dom";

const BoardNav = ({ data }) => {
  console.log(data);

  // 그룹별로
  const BoardItem = () => {
    return data.map((item) => {
      if (item.b_group_code === "B1") {
        return <NavLink to={`/community/${item.b_eng}`}>{item.b_kor}</NavLink>;
      } else {
        return <NavLink to={`/community/${item.b_eng}`}>{item.b_kor}</NavLink>;
      }
    });
  };
  return <BoardItem />;
};

export default BoardNav;
