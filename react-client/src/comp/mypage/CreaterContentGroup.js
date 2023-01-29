import { useVideoContentContext } from "../../context/VideoContentContextProvide";

/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContentGroup = () => {
  const { videoGroupCount, groupThumbnail } = useVideoContentContext();
  const countView = videoGroupCount.map((item) => {
    return (
      <div>
        <span>{item.count}</span>
        <div></div>
      </div>
    );
  });
  return (
    <div className="p-4 border-b-2 border-black">
      <span>재생목록</span>
      <div className="">{countView}</div>
    </div>
  );
};

export default CreaterContentGroup;