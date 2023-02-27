// 각 게시판별 페이지
import BoardList from "./BoardList";
import BoardPage from "./BoardPage";
import "../../css/community/Board.css";
import { getBoardPosts } from "../../service/post.service";
import {
  useNavigate,
  useLocation,
  useLoaderData,
  Link,
} from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import {
  BarsArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { usePostContext } from "../../context/PostContextProvider";

const listLimit = 5;
const pageNavCount = 5;
let pageNum;

export const BoardLoader = async ({ params }) => {
  pageNum = params?.pageNum;
  const query = new URLSearchParams({
    bEng: params?.board,
    order: "latest",
    pageNum: pageNum || 1,
    listLimit,
    pageNavCount,
  }).toString();
  const { data, board, pagination } = await getBoardPosts(query);
  return {
    postData: data,
    boardData: board,
    pagination,
  };
};

const Board = () => {
  const nav = useNavigate();
  const {
    boardCode,
    setBoardCode,
    keyValue,
    setKeyValue,
    initOrder,
    initFilter,
    orderList,
    filterList,
  } = usePostContext();
  const location = useLocation();
  const { userSession } = useUserContext();
  const postData = useLoaderData()?.postData;
  const boardData = useLoaderData()?.boardData;
  const pagination = useLoaderData()?.pagination;

  // cf) useLocation 의 state 는 useState 와 달리
  // 새로고침해도 데이터가 사라지지 않고, url이 바뀌었을 때만 사라진다.
  const data = location?.state?.data || postData;
  const board = location?.state?.board || boardData;
  const filter = location?.state?.filter || initFilter();
  const order = location?.state?.order || initOrder();
  const keyword = location?.state?.keyword || "";
  const msg = location?.state?.msg || "";
  const page = location?.state?.page || pagination;

  // state
  const [postList, setPostList] = useState([...data]);
  const [showOrder, setShowOrder] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [orderValue, setOrderValue] = useState({ ...order });
  const [filterValue, setFilterValue] = useState({ ...filter });
  const [searchInput, setSearchInput] = useState(keyword);
  const [searchMsg, setSearchMsg] = useState(msg);

  useEffect(() => {
    // 게시판이 바뀌거나, 검색화면에서 `모든 게시글 보기` 를 클릭했을 경우
    if (
      (keyValue !== "" &&
        boardCode !== "" &&
        location.key !== keyValue &&
        boardCode !== board.b_code) ||
      (boardCode === board.b_code && !location.search)
    ) {
      setPostList([...data]);
      setSearchInput("");
      setSearchMsg("");
      setOrderValue(initOrder);
      setFilterValue(initFilter);
    }
    setKeyValue(location.key);
    setBoardCode(board.b_code);
  }, [location.key, board]);

  const orderPosts = async (value, text) => {
    setOrderValue({ ...orderValue, eng: value, kor: text });
    let result;
    if (searchInput === "") {
      const query = new URLSearchParams({
        bEng: board.b_eng,
        order: value,
        pageNum: pageNum,
        listLimit,
        pageNavCount,
      }).toString();
      result = await getBoardPosts(query);
    } else {
      const query = new URLSearchParams({
        bCode: board.b_code,
        keyword: searchInput,
        filter: filterValue.eng,
        order: value,
        pageNum: pageNum,
        listLimit,
        pageNavCount,
      }).toString();
      result = await fetch(`/community/posts/search?${query}`).then((result) =>
        result.json()
      );
    }
    setPostList([...result.data]);
    setSearchMsg(result.MESSAGE);
    setShowOrder(false);
    const state = {
      data: result.data,
      board: result.board,
      order: { eng: value, kor: text },
      filter: filterValue,
      msg: result.MESSAGE,
      keyword: searchInput,
      page: result.pagination,
    };

    if (searchInput === "") {
      nav(`/community/${board.b_eng}/1?order=${value}`, {
        state: state,
      });
    } else {
      nav(
        `/community/${board.b_eng}/1?keyword=${searchInput}&filter=${filterValue.eng}&order=${value}`,
        {
          state: state,
        }
      );
    }
  };

  const onClickSetFilter = (value, text) => {
    setFilterValue({ ...filterValue, eng: value, kor: text });
  };

  const searchPosts = async (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
      const query = new URLSearchParams({
        bCode: board.b_code,
        keyword: searchInput,
        filter: filterValue.eng,
        order: orderValue.eng,
        pageNum: pageNum,
        listLimit,
        pageNavCount,
      }).toString();
      const result = await fetch(`/community/posts/search?${query}`).then(
        (data) => data.json()
      );
      setPostList([...result.data]);
      setSearchMsg(result.MESSAGE);
      setShowFilter(false);
      nav(
        `/community/${board.b_eng}/1?keyword=${searchInput}&filter=${filterValue.eng}&order=${orderValue.eng}`,
        {
          state: {
            data: result.data,
            board: result.board,
            order: orderValue,
            filter: filterValue,
            msg: result.MESSAGE,
            keyword: searchInput,
            page: result.pagination,
          },
        }
      );
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
          {orderValue?.kor}
          <div
            className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
            style={{ display: showOrder === true ? "flex" : "none" }}
          >
            {orderList.map((order) => {
              return (
                <div
                  key={order.eng}
                  className={optionClass}
                  value={order.eng}
                  onClick={() => {
                    orderPosts(order.eng, order.kor);
                  }}
                >
                  {order.kor}
                </div>
              );
            })}
          </div>
        </button>
        <div className="cat-search flex-1 flex justify-center">
          <button
            className={`search-select relative text-sm w-[130px] ${inputClass} rounded-r-none`}
            onClick={() => setShowFilter(true)}
            onBlur={() => setShowFilter(false)}
          >
            {filterValue?.kor}
            <ChevronDownIcon className="inline-block float-right mt-0.5 ml-3 h-4 w-4 text-slate-500" />
            <div
              className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
              style={{ display: showFilter === true ? "flex" : "none" }}
            >
              {filterList.map((item) => {
                return (
                  <div
                    key={item.eng}
                    className={optionClass}
                    value={item.eng}
                    onClick={() => onClickSetFilter(item.eng, item.kor)}
                  >
                    {item.kor}
                  </div>
                );
              })}
            </div>
          </button>
          <input
            className={`${inputClass} w-[20vw] rounded-none`}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={searchPosts}
            spellCheck={false}
            value={searchInput}
            type="search"
          />
          <button
            className={`${inputClass} rounded-l-none`}
            onClick={searchPosts}
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
              username: userSession?.username,
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
          to={`/community/${board.b_eng}/1`}
          replace
        >
          모든 게시글 보기
        </Link>
      </div>
      <BoardList board={board} data={postList} />
      <BoardPage
        board={board}
        page={page}
        curState={location?.state}
        setPostList={setPostList}
      />
    </main>
  );
};

export default Board;
