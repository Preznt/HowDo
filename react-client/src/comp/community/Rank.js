import { useRef } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함

const Rank = ({ data }) => {
  const keyRef = useRef(0);

  // b_content 불러올 때 markdown 은 replace 해야

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;
      return (
        <div
          className="rank-item grid grid-cols-2 grid-rows-2 p-2"
          key={keyRef.current}
        >
          {/* 나중에 nickname으로 수정 */}
          <div className="text-left">{item.username}</div>
          <div className="w-full text-right">
            <span className="text-gray-400">{item.r_count || "0"}</span>
            <span className="text-gray-400">{item.b_upvote}</span>
          </div>
          <div className="text-left font-bold">{item.b_title}</div>
          <div className="text-right">{item.b_category}</div>
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
