import ReactPlayer from "react-player";
import { useState } from "react";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContent = () => {
  const { videoContentList } = useVideoContentContext();
  const [hover, setHover] = useState(false);
  console.log(videoContentList);

  const videoView = videoContentList.map((item) => {
    return (
      <>
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
      </>
    );
  });
  // console.log(hover);
  return (
    <>
      <span className="p-4 border-b-2 border-black">최근 업로드한 영상</span>
      <div
        className="m-12 flex w-80 h-64 flex-col justify-center items-center transition-all duration-700 hover:h-72 hover:w-96"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <videoView />
        <div>
          <img alt="profile"></img>
          <h3>영상제목1</h3>
          <h6>작성자</h6>
          <h6>조회수</h6>
        </div>
      </div>
    </>
  );
};

export default CreaterContent;
