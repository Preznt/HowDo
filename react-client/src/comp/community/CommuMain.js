// 커뮤니티 초기 화면
import Rank from "./Rank";
import { getMainPosts } from "../../service/post.service";
import { useLayoutEffect, useState } from "react";

const CommuMain = () => {
  const [rankData, setRankData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const result = await getMainPosts();
      if (result) setRankData([...result.data]);
      return null;
    })();
  }, []);

  // component 함수는 비동기로 실행되서는 안된다(async, await X).
  const MainItem = () => {
    return rankData.map((item) => {
      return (
        <section className="main-item p-5" key={item.code}>
          <div className="main-item-title mb-2.5 p-2 text-left text-lg font-bold border-b border-slate-300">
            {item.name}
          </div>
          <Rank data={item.posts} />
        </section>
      );
    });
  };

  return (
    <main className="cat-main container mx-auto">
      <MainItem />
    </main>
  );
};

export default CommuMain;
