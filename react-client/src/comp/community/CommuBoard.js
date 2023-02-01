// 각 게시판별 페이지
// .../community/board/catA
import List from "./List";
import "../../css/community/CommuBoard.css";
import { getBoardPosts } from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useState, useLayoutEffect, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CommuBoard = () => {
  const bEng = useParams().board;
  const { boardData, setBoardData } = usePostContext();
  const [postList, setPostList] = useState([]);

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
        setPostList([...result.data]);
        setBoardData({ ...result.board });
      }
      return null;
    })();
  }, []);

  useEffect(() => {
    console.log(boardData);
  });

  return (
    <main className="commu-cat">
      <h1>{boardData.b_kor}</h1>
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
        <Link
          className={btnClass}
          to={`/community/write`}
          state={{
            b_code: boardData.b_code,
            b_group_code: boardData.b_group_code,
          }}
        >
          글쓰기
        </Link>
      </section>
      <List data={postList} />
    </main>
  );
};

export default CommuBoard;
