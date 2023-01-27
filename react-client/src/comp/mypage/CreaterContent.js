import ReactPlayer from "react-player";
import { useState } from "react";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContent = () => {
  const { videoContentList } = useVideoContentContext();
  const [hover, setHover] = useState(false);

  const videoView = videoContentList.map((item) => {
    return (
      <div
        className="m-12 flex w-80 h-64 flex-col justify-center items-center transition-all duration-700 hover:h-72 hover:w-96"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {hover ? (
          <ReactPlayer
            width="100%"
            url={item.v_src}
            playing={true}
            muted={true}
          />
        ) : (
          <ReactPlayer
            width="100%"
            url={item.v_src}
            playing={false}
            muted={false}
          />
        )}
        ;
        <div>
          <img alt="profile"></img>
          <h3>{item.v_title}</h3>
          <h6>{item.username}</h6>
          <h6>{item.v_count}</h6>
        </div>
      </div>
    );
  });

  return (
    <>
      <span className="p-4 border-b-2 border-black">최근 업로드한 영상</span>
      {videoView}
    </>
  );
};

export default CreaterContent;
