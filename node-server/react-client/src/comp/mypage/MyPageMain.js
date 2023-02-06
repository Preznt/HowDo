import { useNavigate } from "react-router-dom";
import CreaterContent from "./CreaterContent";
import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import Purchase from "../purchase/Purchase";

export const myPageFetch = async ({ params }) => {
  const username = params.id;

  const response = await fetch(`/mypage/${username}`);
  const result = await response?.json();
  return result;
};
const MyPageMain = () => {
  const { userSession, modalHandler } = useUserContext();
  const { payReadyBody, statePayReady } = usePayContext();
  const navigate = useNavigate();
  const twoClickEvent = () => {
    modalHandler();
    payReadyBody();
    console.log(statePayReady);
  };

  return (
    <>
      {userSession.username ? (
        <div className="w-full">
          <div className="m-12 ml-56 w-full h-60 container border-2 border-black">
            <img
              className="w-full h-full"
              src={
                userSession.title_image
                  ? userSession.title_image
                  : "./image/noimage.png"
              }
            />
          </div>
          <div className="mt-12 mb-6 pl-56 w-11/12 flex">
            <img
              width="50px"
              heigt="50px"
              className="rounded-full"
              src={
                userSession.profile_image
                  ? userSession.profile_image
                  : "./image/noimage.png"
              }
              alt="profile"
            />
            <div>{userSession.nickname}</div>
            <div className="ml-auto" onClick={twoClickEvent}>
              구독
            </div>
            <div>게시글 작성</div>
          </div>
          <div className="ml-44">
            <CreaterContent />
            {/* <CreaterContentFavorite /> */}
          </div>{" "}
          <Purchase />{" "}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default MyPageMain;
