import CreaterContent from "./CreaterContent";
import CreaterContentFavorite from "./CreaterContentFavorite";

const MyPageMain = () => {
  return (
    <div>
      <div className="m-12 w-screen h-60 container border-2 border-black border-current">
        <img src="https://picsum.photos/1540/240"></img>
      </div>
      <div className="m-12 flex">
        <img alt="profile"></img>
        <div>CreaterName</div>
        <div className="ml-auto">구독</div>
        <div>게시글 작성</div>
      </div>
      <CreaterContent />
      <CreaterContentFavorite />
    </div>
  );
};

export default MyPageMain;
