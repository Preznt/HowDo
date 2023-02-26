import { NavLink, useLocation } from "react-router-dom";

const genPageNav = (bEng, pagination) => {
  const startNavNum = pagination.startNavNum;
  let endNavNum = startNavNum + pagination.pageNavCount;
  endNavNum =
    endNavNum > pagination.pageTotalCount
      ? pagination.pageTotalCount + 1
      : endNavNum;

  const navNumArr = [
    0,
    startNavNum > 1 && (pagination.pageNum - 1) * -1,
    ...Array.from(Array(endNavNum - startNavNum).keys()).map(
      (v) => v + startNavNum
    ),
    endNavNum <= pagination.pageTotalCount && (pagination.pageNum + 1) * -1,
    Number.MAX_SAFE_INTEGER,
  ];

  // 정렬 및 검색을 반영하는 방법?
  return navNumArr.reduce((result, nav) => {
    if (nav !== false) {
      result = [
        ...result,
        <div key={nav}>
          <NavLink
            key={nav}
            className={({ isActive }) =>
              nav !== 0 && nav !== Number.MAX_SAFE_INTEGER && isActive
                ? "active text-lg text-blue-500"
                : "text-lg"
            }
            to={`/community/${bEng}/${
              nav < 0
                ? nav * -1
                : nav === 0
                ? 1
                : nav === Number.MAX_SAFE_INTEGER
                ? pagination.pageTotalCount
                : nav
            }`}
          >
            {nav < 0 ? (
              <>&middot;&middot;&middot;</>
            ) : nav === 0 ? (
              <>&#x2758;&lt;</>
            ) : nav === Number.MAX_SAFE_INTEGER ? (
              <>&gt;&#x2758;</>
            ) : (
              nav
            )}
          </NavLink>
        </div>,
      ];
    }
    return result;
  }, []);
};

const BoardPage = ({ board, pagination }) => {
  const location = useLocation();
  console.log(location);
  const pageNav = genPageNav(board.b_eng, pagination);
  return (
    <div className="pageNavBar flex justify-center gap-3 w-full mt-5">
      {pageNav}
    </div>
  );
};

export default BoardPage;
