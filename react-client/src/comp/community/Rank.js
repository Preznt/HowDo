import { useRef } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const Rank = ({ data }) => {
  const keyRef = useRef(0);

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;
      return (
        <div
          className="rank-item grid grid-cols-2 grid-rows-2 p-2 border-b border-dashed border-slate-300"
          key={keyRef.current}
        >
          <div className="text-left font-bold">{item.p_title}</div>
          <div className="w-full text-right">
            <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_views}</span>
            <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_upvote}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span>{item.p_replies}</span>
          </div>
          {/* 나중에 nickname으로 수정 */}
          <div className="text-left">{item.username}</div>
          <div className="text-right">{item["board.b_kor"]}</div>
        </div>
      );
    });
  };

  return (
    <section className="commu-rank grid grid-cols-none grid-rows-5">
      <RankItem />
    </section>
  );
};

export default Rank;
