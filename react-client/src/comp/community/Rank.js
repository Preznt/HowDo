import { useRef } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함

const Rank = ({ data }) => {
  const keyRef = useRef(0);

  // b_content 불러올 때 markdown 은 replace 해야

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;
      // const content = item?.b_content;
      // let imgSrc = "";
      // if (content) {
      //   const imgStartIdx = content.indexOf("![](");
      //   if (imgStartIdx > -1) {
      //     const imgLastIdx = item?.b_content.indexOf(")", imgStartIdx);
      //     imgSrc = item?.b_content.slice(imgStartIdx + 4, imgLastIdx);
      //   }
      // }

      return (
        <div className="rank-item p-2" key={keyRef.current}>
          <div>
            <img src={`/static/uploads/${item["attachs.thumb"]}`} />
          </div>
          <div className="w-full text-center">
            <span className="font-bold">{item.b_title}</span>
            <span className="text-gray-400"> [{item.count}]</span>
          </div>
          <div className="h-24 overflow-hidden text-ellipsis">
            {item.b_content}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="commu-rank grid grid-cols-5 grid-rows-none">
      <RankItem />
    </section>
  );
};

export default Rank;
