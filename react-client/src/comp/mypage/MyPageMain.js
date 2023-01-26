import { useEffect } from "react";
import CreaterContent from "./CreaterContent";
import CreaterContentFavorite from "./CreaterContentFavorite";
import { useUserContext } from "../../context/UserContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
const MyPageMain = () => {
  const { userSession } = useUserContext();
  const { setVideoContentList, videoContentList } = useVideoContentContext();
  console.log(userSession.username);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`/mypage/${userSession.username}`);
      const result = await response.json();
      console.log(result);
      setVideoContentList(result);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div className="m-12 w-screen h-60 container border-2 border-black border-current">
        <img src="https://picsum.photos/1540/240"></img>
      </div>
      <div className="m-12 flex">
        <img
          width="20px"
          heigt="20px"
          className="rounded-full"
          src={userSession.profile_image}
          alt="profile"
        ></img>
        <div>{userSession.nickname}</div>
        <div className="ml-auto">구독</div>
        <div>게시글 작성</div>
      </div>
      <CreaterContent />
      <CreaterContentFavorite />
    </div>
  );
};

export default MyPageMain;
