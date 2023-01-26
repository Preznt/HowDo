// 커뮤니티 초기 화면
import Rank from "./Rank";

const Main = () => {
  // catList: 임시 server 데이터
  const catList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "life", kor: "생활" },
    { eng: "issue", kor: "이슈" },
  ];

  const MainItem = () => {
    return catList.map((cat) => {
      return (
        <section className="main-item p-5" key={cat.eng}>
          <div className="main-item-title mb-2.5 p-2 text-left text-lg font-bold border-b border-#d1d5db">
            {cat.kor}
          </div>
          <Rank />
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

export default Main;
