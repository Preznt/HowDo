// 각 게시판별 페이지
import BoardList from "./BoardList";
import "../../css/community/Board.css";
import { getBoardPosts } from "../../service/post.service";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const loader = async ({ params }) => {
  const bEng = params.board;
  const { data, board } = await getBoardPosts(bEng);
  return { data, board };
};

const Board = () => {
  const { userSession } = useUserContext();
  const { data, board } = useLoaderData();
  const orderList = [
    { o_eng: "latest", o_kor: "최신순" },
    { o_eng: "upvotes", o_kor: "추천순" },
    { o_eng: "replies", o_kor: "댓글순" },
    { o_eng: "views", o_kor: "조회순" },
  ];
  const [showOrder, setShowOrder] = useState(false);
  const [orderValue, setOrderValue] = useState(`${orderList[0].o_kor}`);

  const onClickSetOrder = (value) => {
    setOrderValue(value);
  };

  const onClickShowOrder = () => {
    setShowOrder(!showOrder);
  };

  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2";
  const optionClass = "w-full p-2 hover:bg-blue-500 hover:text-white";
  const inputClass =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2";

  return (
    <main className="commu-cat w-full">
      <h1 className="text-xl font-bold p-5">{board.b_kor}</h1>
      <section className="flex w-full pl-5 pr-5 pb-10 justify-between">
        <button
          className={`search-select relative w-30 ${selectClass}`}
          onClick={onClickShowOrder}
        >
          <BarsArrowDownIcon className="inline-block mr-3 h-5 w-5 text-slate-500" />
          {orderValue}
          <div
            className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
            style={{ display: showOrder === true ? "flex" : "none" }}
          >
            {orderList.map((order) => {
              return (
                <checkbox
                  className={`${optionClass}`}
                  name="order"
                  value={order.o_eng}
                  onClick={() => onClickSetOrder(order.o_kor)}
                >
                  {order.o_kor}
                </checkbox>
              );
            })}
          </div>
        </button>
        <div className="cat-search flex justify-center">
          <input className={inputClass} />
          <button className={`ml-2 ${btnClass02}`}>검색</button>
        </div>
        {/* 로그인 유저의 등급이 게시판 권한등급보다 같거나 높을 때 */}
        {Number(userSession?.level) >= Number(board.b_level) && (
          <Link
            className={btnClass}
            to={`/community/${board.b_eng}/write`}
            state={{
              b_code: board.b_code,
              b_eng: board.b_eng,
              b_group_code: board.b_group_code,
            }}
          >
            글쓰기
          </Link>
        )}
      </section>
      <BoardList data={data} />
    </main>
  );
};

export default Board;
