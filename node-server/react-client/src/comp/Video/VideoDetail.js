import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
const VideoDetail = () => {
  const { videoDetail, relationship } = useVideoContentContext();
  const nav = useNavigate();
  const relationshipItem = relationship.filter((item) => {
    return item.v_code !== videoDetail.v_code;
  });

  const imageStyle = {
    width: "1350px",
    height: "600px",
  };

  const videoRelationshipView = relationshipItem.map((video) => {
    return (
      <div
        data-v_code={video.v_code}
        className="mx-7 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
      >
        <iframe
          className="w-full h-full columns-1 aspect-video border-black border-1"
          src={video.v_src}
        ></iframe>
        <div className="item-left">
          <h3 data-v_code={video.v_code}>제목 : {video.v_title}</h3>
        </div>
      </div>
    );
  });
  console.log(videoDetail);
  if (videoDetail.v_price === 0) {
    return (
      <div className="flex ml-32 mt-2">
        <div className="flex-1 ">
          <div className="pb-10 pr-10 block border-b-2">
            <ReactPlayer
              url={videoDetail.v_src} // 플레이어 url
              width="1350px" // 플레이어 크기 (가로)
              height="600px" // 플레이어 크기 (세로)
              playing={false} // 자동 재생 on
              muted={false} // 자동 재생 on
              controls={true} // 플레이어 컨트롤 노출 여부
              light={false} // 플레이어 모드
              pip={false} // pip 모드 설정 여부
            />
          </div>
          <div>
            <div className="text-4xl">{videoDetail.v_title}</div>
            <div>{videoDetail.username}</div>
            <div>{videoDetail.v_detail}</div>
          </div>
        </div>
        <aside className="border-l-2 pb-80 flex-1">
          {videoRelationshipView}
        </aside>
      </div>
    );
  } else if (videoDetail.v_price > 0) {
    alert("결제가 필요한 동영상 입니다");
    return nav("/");
  }
};
export default VideoDetail;
