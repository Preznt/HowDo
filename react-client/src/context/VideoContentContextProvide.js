import { useContext, createContext, useState } from "react";
import { VideoContent } from "../data/VideoContent";

const VideoContentContext = createContext();

export const useVideoContentContext = () => {
  return useContext(VideoContentContext);
};

export const VideoContentContextProvider = ({ children }) => {
  const [videoContent, setVideoContent] = useState(new VideoContent());
  const [videoContentList, setVideoContentList] = useState();

  const props = {
    videoContentList,
    setVideoContentList,
    videoContent,
    setVideoContent,
  };

  return (
    <VideoContentContext.Privoder value={props}>
      {children}
    </VideoContentContext.Privoder>
  );
};
