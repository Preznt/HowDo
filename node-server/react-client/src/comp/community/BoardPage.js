import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getBoardPosts } from "../../service/post.service";

const BoardPage = ({ board, page, curState, setPostList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pagination = curState?.page || page;

  const PageNav = () => {
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
        (val) => val + startNavNum
      ),
      endNavNum <= pagination.pageTotalCount && (pagination.pageNum + 1) * -1,
      Number.MAX_SAFE_INTEGER,
    ];

    const onClickHandler = async () => {
      if (!curState?.data) {
        return null;
      }
      console.log(curState);
      let result;
      let query = new URLSearchParams({
        bEng: board.b_eng,
        bCode: board.b_code,
        order: curState?.order?.eng,
        pageNum: curState?.page?.pageNum,
        listLimit: curState?.page?.listLimit,
        pageNavCount: curState?.page?.pageNavCount,
      });

      if (curState?.data && !curState?.keyword) {
        console.log("정렬");
        query.toString();
        result = await getBoardPosts(query);
      }
      if (curState?.data && curState?.keyword) {
        console.log("검색");
        query.append("keyword", curState?.keyword);
        query.append("filter", curState?.filter?.eng);
        query.toString();
        result = await fetch(`/community/posts/search?${query}`).then(
          (result) => result.json()
        );
      }
      const state = {
        data: result.data,
        board: result.board,
        order: curState?.order,
        filter: curState?.filter,
        msg: result.MESSAGE,
        keyword: curState?.keyword,
        page: result.pagination,
      };
      await setPostList([...state.data]);
      return state;
    };

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
              to={`/community/${board.b_eng}/${
                nav < 0
                  ? nav * -1
                  : nav === 0
                  ? 1
                  : nav === Number.MAX_SAFE_INTEGER
                  ? pagination.pageTotalCount
                  : nav
              }${location?.search}`}
              onClick={async () => {
                const asdf = await onClickHandler();
                navigate(
                  `/community/${board.b_eng}/${
                    nav < 0
                      ? nav * -1
                      : nav === 0
                      ? 1
                      : nav === Number.MAX_SAFE_INTEGER
                      ? pagination.pageTotalCount
                      : nav
                  }${location?.search}`,
                  { state: asdf }
                );
              }}
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
  return (
    <div className="pageNavBar flex justify-center gap-3 w-full mt-5">
      <PageNav />
    </div>
  );
};

export default BoardPage;
