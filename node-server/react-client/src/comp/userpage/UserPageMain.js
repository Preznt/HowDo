import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import { useLoaderData } from "react-router-dom";
import Purchase from "../purchase/Purchase";
import CreaterPageContent from "./CreaterPageContent";

export const userPageFetch = async ({ params }) => {
  const username = params.id;
  const response = await fetch(`/mypage/creater/${username}`);
  const createrResult = await response?.json();
  return createrResult;
};
const UserPageMain = () => {
  const { userSession, modalHandler } = useUserContext();
  const { payReadyBody, statePayReady } = usePayContext();
  const createrResult = useLoaderData();
  const twoClickEvent = () => {
    modalHandler();
    payReadyBody();
    console.log(statePayReady);
  };

  return (
    <div className="w-full">
      <div className="m-12 ml-56 w-full h-60 container border-2 border-black">
        <img
          className="w-full h-full"
          src={
            createrResult?.u_result?.title_image
              ? createrResult.u_result?.title_image
              : "../image/noimage.png"
          }
        />
      </div>
      <div className="mt-12 mb-6 pl-56 w-11/12 flex">
        <img
          width="50px"
          heigt="50px"
          className="rounded-full"
          src={
            createrResult?.u_result?.profile_image
              ? createrResult?.u_result?.profile_image
              : "../image/noimage.png"
          }
          alt="profile"
        />
        <div>{createrResult?.u_result?.nickname}</div>
        <div className="ml-auto" onClick={twoClickEvent}>
          구독
        </div>
        <div>게시글 작성</div>
      </div>
      <div className="ml-44">
        <CreaterPageContent />
      </div>{" "}
      <Purchase />{" "}
    </div>
  );
};

export default UserPageMain;
