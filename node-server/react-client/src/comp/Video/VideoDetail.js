import { useEffect } from "react";
import ReactPlayer from "react-player";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import Reply from "../community/Reply";
import { usePayContext } from "../../context/PayContextProvider";
const VideoDetail = () => {
  const {
    videoDetail,
    relationship,
    onClickDetailHandler,
    deleteVideo,
    setOpenModel,
    setDetail,
    setShorts,
    replyList,
  } = useVideoContentContext();
  const { userSession } = useUserContext();
  const { payReadyBody } = usePayContext();
  const nav = useNavigate();
  const relationshipItems = relationship.filter((item) => {
    return item.v_code !== videoDetail.v_code;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickHandler = (e) => {
    const v_code = e.target.dataset.v_code;
    nav(`/video/detail/${v_code}`);
    return onClickDetailHandler(v_code);
  };

  const deleteHandler = (e) => {
    const v_code = e.target.dataset.v_code;
    const Username = userSession.username;
    const deleteData = { Username, v_code };
    deleteVideo(deleteData);
    nav("/");
  };

  const videoEditingHandler = async (e) => {
    const v_code = e.target.dataset.v_code;
    setOpenModel({ video: true });
    const res = await fetch(`/video/editing/select/${v_code}`);
    const { videoInfo, shorts } = await res.json();
    setDetail({ ...videoInfo });
    setShorts({ ...shorts });
  };

  const videoRelationshipView = relationshipItems.map((video) => {
    return (
      <div
        data-v_code={video.v_code}
        className="mx-7 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
        onClick={onClickHandler}
        onContextMenu={(e) => e.preventDefault()}
        key={video.v_code}
      >
        {video.v_price === 0 ? (
          <video
            className="w-full h-full columns-1 aspect-video border-black border-1"
            src={video.v_src}
            controlsList="nodownload"
            controls
            data-v_code={video.v_code}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <video
            className="w-full h-full columns-1 aspect-video border-black border-1"
            src={video.v_src}
            controlsList="nodownload"
            data-v_code={video.v_code}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
        <div className="item-left">
          <h3 data-v_code={video.v_code}>?????? : {video.v_title}</h3>
        </div>
      </div>
    );
  });
  if (videoDetail.code === 404) {
    alert(videoDetail.message);
    return <Navigate to="/" />;
  } else if (videoDetail.v_price === 0) {
    return (
      <div className="flex ml-32 mt-2">
        <div className="flex-1 ">
          <div className="pb-10 pr-10 block border-b-2">
            <ReactPlayer
              url={videoDetail.v_src}
              width="1350px"
              height="600px"
              playing={false}
              muted={false}
              controls={true}
              light={false}
              pip={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div>
            <div>
              <div className="text-4xl">{videoDetail.v_title}</div>
              <div>{videoDetail.username}</div>
              <div>{videoDetail.v_detail}</div>
            </div>
          </div>
          {userSession.username === videoDetail.username ? (
            <div className="flex justify-end">
              <button
                data-v_code={videoDetail.v_code}
                onClick={videoEditingHandler}
                className="bg-cyan-600 rounded-md mr-2 text-white p-2 px-3"
              >
                ??????
              </button>
              <button
                data-v_code={videoDetail.v_code}
                onClick={deleteHandler}
                className="bg-cyan-600 rounded-md mr-10 text-white p-2 px-3 "
              >
                ??????
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex">
            <Reply
              writer={videoDetail?.username}
              v_code={videoDetail?.v_code}
              list={replyList}
            />
          </div>
        </div>
        <aside className="border-l-2 pb-80 flex-1">
          {videoRelationshipView}
        </aside>
      </div>
    );
  } else if (!userSession.username) {
    alert("???????????? ????????? ??????????????????");
    return <Navigate to="/user/login" />;
  } else if (videoDetail.v_price !== 0) {
    alert("????????? ????????? ????????? ?????????");
    payReadyBody(
      videoDetail.username,
      videoDetail.v_price,
      videoDetail.v_title,
      videoDetail.v_code,
      videoDetail.v_src
    );
    return <Navigate to="/payReady" />;
  }
};
export default VideoDetail;
