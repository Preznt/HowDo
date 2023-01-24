import CreaterContent from "./CreaterContent";

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
        <div>즐겨찾기</div>
      </div>
      <CreaterContent />
    </div>
  );
};

export default MyPageMain;
