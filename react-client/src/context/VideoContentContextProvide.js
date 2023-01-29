import { useContext, createContext, useState, useEffect } from "react";
import { VideoContent } from "../data/VideoContent";
import { useUserContext } from "./UserContextProvider";

const VideoContentContext = createContext();

export const useVideoContentContext = () => {
  return useContext(VideoContentContext);
};

export const VideoContentContextProvider = ({ children }) => {
  const [videoContent, setVideoContent] = useState(new VideoContent());
  const [videoContentList, setVideoContentList] = useState();
  const { userSession } = useUserContext();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/mypage/${userSession.username}`);
      const result = await response?.json();
      console.log(result);
      setVideoContentList(result);
    })();
  }, [userSession]);

  const props = {
    videoContentList,
    setVideoContentList,
    videoContent,
    setVideoContent,
  };

  return (
    <VideoContentContext.Provider value={props}>
      {children}
    </VideoContentContext.Provider>
  );
};
