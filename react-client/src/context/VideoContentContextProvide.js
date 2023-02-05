import { useContext, createContext, useState } from "react";
import { VideoContent } from "../data/VideoContent";
const VideoContentContext = createContext();

export const useVideoContentContext = () => {
  return useContext(VideoContentContext);
};

export const VideoContentContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [videoContent, setVideoContent] = useState(new VideoContent());
  const [videoContentList, setVideoContentList] = useState();
  const [videoGroupCount, setVideoGroupCount] = useState();
  const [groupThumbnail, setGroupThumbnail] = useState();
  const [videoItemList, setVideoItemList] = useState([]);
  const [file, setFile] = useState({}); // 동영상 업로드 미리보기용 state
  const [shorts, setShorts] = useState({
    shorts: false,
  });
  const [detail, setDetail] = useState({
    url: "",
    video: false,
    v_title: "",
    v_price: 0,
    v_detail: "",
    v_category: "",
    v_save_file: "",
  });

  const props = {
    videoContentList,
    setVideoContentList,
    videoContent,
    setVideoContent,
    videoGroupCount,
    setVideoGroupCount,
    groupThumbnail,
    setGroupThumbnail,
    videoItemList,
    setVideoItemList,
    file,
    setFile,
    detail,
    setDetail,
    shorts,
    setShorts,
    loading,
    setLoading,
  };

  return (
    <VideoContentContext.Provider value={props}>
      {children}
    </VideoContentContext.Provider>
  );
};
