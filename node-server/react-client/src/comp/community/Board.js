// 각 게시판별 페이지
import BoardList from "./BoardList";
import "../../css/community/Board.css";
import { getBoardPosts } from "../../service/post.service";
import {
  useNavigate,
  useLocation,
  useLoaderData,
  Link,
  useParams,
} from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import {
  BarsArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export const BoardLoader = async ({ params }) => {
  const bEng = params.board;
  const order = "latest";
  const { data, board } = await getBoardPosts(bEng, order);
  return { data, board };
};

const Board = () => {
  const nav = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { userSession } = useUserContext();
  const { data, board } = useLoaderData();

  // select option
  const orderList = [
    { o_eng: "latest", o_kor: "최신순" },
    { o_eng: "upvotes", o_kor: "추천순" },
    { o_eng: "replies", o_kor: "댓글순" },
    { o_eng: "views", o_kor: "조회순" },
  ];
  const filterList = [
    { s_eng: "title_content", s_kor: "제목+내용" },
    { s_eng: "title", s_kor: "제목" },
    { s_eng: "content", s_kor: "내용" },
    { s_eng: "nickname", s_kor: "닉네임" },
    { s_eng: "reply", s_kor: "댓글" },
  ];

  const initOrder = () => {
    const order = {
      eng: `${orderList[0].o_eng}`,
      kor: `${orderList[0].o_kor}`,
    };
    return order;
  };

  const initFilter = () => {
    const filter = {
      eng: `${filterList[0].s_eng}`,
      kor: `${filterList[0].s_kor}`,
    };
    return filter;
  };

  // state
  const [postList, setPostList] = useState([...data]);
  const [showOrder, setShowOrder] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [orderValue, setOrderValue] = useState(initOrder);
  const [filterValue, setFilterValue] = useState(initFilter);
  const [searchInput, setSearchInput] = useState("");
  const [searchMsg, setSearchMsg] = useState("");

  /**
   * 페이지 경로에 따라 게시글 리스트와 값들을 변경
   * 1. 게시판 초기 화면
   * 2. 게시글 클릭 후 게시판으로 되돌아왔을 때
   * 3. 검색 직후 화면
   * 4. 검색하여 게시글 클릭 후 게시판으로 되돌아왔을 때
   * 5. 검색 후 모든 게시글 보기를 클릭했을 때
   */

  // useEffect(() => {
  //   console.log("par.loc", location);
  //   console.log("par.par", params);
  // }, []);

  useEffect(() => {
    console.log("loc.loc", location);
    console.log("loc.par", params);
    if (location?.state?.search) {
      setPostList([...location?.state?.data]);
      setSearchMsg([...location?.state?.msg]);
      setFilterValue({ ...location?.state?.filter });
      setSearchInput(location?.state?.search);
    } else {
      setPostList([...data]);
      setSearchMsg("");
      setSearchInput("");
      setOrderValue(initOrder);
      setFilterValue(initFilter);
    }
  }, [location?.state?.search, params.board]);

  const onClickSetOrder = async (value, text) => {
    if (!location?.state?.msg) {
      const result = await getBoardPosts(board?.b_eng, value).then(
        (result) => result.data
      );
      setPostList([...result]);
    } else {
      const result = await fetch(
        `/community/posts/${board?.b_code}/${searchInput}/${filterValue?.eng}/${value}/search`
      )
        .then((result) => result.json())
        .then((result) => result.data);
      setPostList([...result]);
    }
    setOrderValue({ eng: value, kor: text });
    setShowOrder(false);
  };

  const onClickSetSearchBy = (value, text) => {
    setFilterValue({ ...filterValue, eng: value, kor: text });
  };

  const SearchPosts = async (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
      const result = await fetch(
        `/community/posts/${board.b_code}/${searchInput}/${filterValue.eng}/${orderValue.eng}/search`
      ).then((data) => data.json());
      // 페이지 이동
      nav(`/community/${board.b_eng}/search`, {
        state: {
          data: result.data,
          search: searchInput,
          filter: { eng: filterValue.eng, kor: filterValue.kor },
          msg: result.MESSAGE,
        },
      });
    }
  };

  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2";
  const optionClass = "w-full p-2 hover:bg-blue-500 hover:text-white";
  const inputClass =
    "bg-slate-200 appearance-none border-2 border-transparent rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2";

  return (
    <main className="commu-cat w-full">
      <div className="border-l-8 border-slate-400 text-2xl font-bold p-5 mb-5">
        {board.b_kor}
      </div>
      <section className="flex w-full pb-5 justify-between">
        <button
          className={`order-select relative w-30 ${selectClass}`}
          onClick={() => setShowOrder(true)}
          onBlur={() => setShowOrder(false)}
        >
          <BarsArrowDownIcon className="inline-block mr-3 h-5 w-5 text-slate-500" />
          {orderValue.kor}
          <div
            className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
            style={{ display: showOrder === true ? "flex" : "none" }}
          >
            {orderList.map((order) => {
              return (
                <div
                  key={order.o_eng}
                  className={optionClass}
                  value={order.o_eng}
                  onClick={() => onClickSetOrder(order.o_eng, order.o_kor)}
                >
                  {order.o_kor}
                </div>
              );
            })}
          </div>
        </button>
        <div className="cat-search flex-1 flex justify-center">
          <button
            className={`search-select relative text-sm w-[130px] ${inputClass} rounded-r-none`}
            onClick={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          >
            {filterValue.kor}
            <ChevronDownIcon className="inline-block float-right mt-0.5 ml-3 h-4 w-4 text-slate-500" />
            <div
              className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
              style={{ display: showSearch === true ? "flex" : "none" }}
            >
              {filterList.map((item) => {
                return (
                  <div
                    key={item.s_eng}
                    className={optionClass}
                    value={item.s_eng}
                    onClick={() => onClickSetSearchBy(item.s_eng, item.s_kor)}
                  >
                    {item.s_kor}
                  </div>
                );
              })}
            </div>
          </button>
          <input
            className={`${inputClass} w-[20vw] rounded-none`}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={SearchPosts}
            spellCheck={false}
            value={searchInput}
            type="search"
          />
          <button
            className={`${inputClass} rounded-l-none`}
            onClick={SearchPosts}
            disabled={searchInput.length > 0 ? false : true}
          >
            <MagnifyingGlassIcon className="inline-block h-6 w-6 text-slate-500" />
          </button>
        </div>
        {/* 로그인 유저의 등급이 게시판 권한등급보다 같거나 높을 때 */}
        {Number(userSession?.level) >= Number(board.b_level) && (
          <Link
            className={btnClass}
            to={`/community/write`}
            state={{
              b_code: board.b_code,
              b_kor: board.b_kor,
              b_eng: board.b_eng,
              b_group_code: board.b_group_code,
            }}
          >
            글쓰기
          </Link>
        )}
      </section>
      <div
        className="text-center p-3 mx-5 mt-5 border-b border-slate-200"
        style={{ display: searchMsg ? "block" : "none" }}
      >
        {searchMsg}
        <Link
          className="block text-center w-[10em] p-1 mx-auto mt-2 underline text-blue-500"
          to={`/community/${board.b_eng}`}
        >
          모든 게시글 보기
        </Link>
      </div>
      <BoardList board={board} data={postList} />
    </main>
  );
};

export default Board;
