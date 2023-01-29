import { useEffect } from "react";
import CreaterContent from "./CreaterContent";
import CreaterContentFavorite from "./CreaterContentFavorite";
import { useUserContext } from "../../context/UserContextProvider";
import CreaterContentGroup from "./CreaterContentGroup";

const MyPageMain = () => {
  const { userSession, setUserSession } = useUserContext();

  //  console.log(userSession.username);

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
      <CreaterContentGroup />
    </div>
  );
};

export default MyPageMain;
