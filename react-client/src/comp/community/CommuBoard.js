// 각 게시판별 페이지
// .../community/board/catA
import List from "./List";
import "../../css/community/CommuBoard.css";
import { useState, useLayoutEffect } from "react";
import { getBoardPosts } from "../../service/post.service";
import { useParams } from "react-router-dom";

const CommuBoard = () => {
  // 임시 카테고리 코드
  const bEng = useParams().board;
  const [boardName, setBoardName] = useState("");
  const [boardList, setBoardList] = useState([]);
  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2";
  const inputClass =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2";

  useLayoutEffect(() => {
    (async () => {
      const result = await getBoardPosts(bEng);
      if (result) {
        setBoardList([...result.data]);
        setBoardName(result.board.b_kor);
      }
      return null;
    })();
  }, []);

  return (
    <main className="commu-cat">
      <h1>{boardName}</h1>
      <section className="flex pl-5 pr-5 pb-10 justify-between">
        <button className={`search-select ${selectClass}`}>{"최신순"}</button>
        <div className="hidden">
          <button className="latest">최신순</button>
          <button className="upvote">추천순</button>
          <button className="reply">댓글순</button>
          <button className="views">조회순</button>
        </div>
        <div className="cat-search flex justify-center">
          <input className={inputClass} />
          <button>검색</button>
        </div>
        <button className={btnClass}>글쓰기</button>
      </section>
      <List data={boardList} />
    </main>
  );
};

export default CommuBoard;
