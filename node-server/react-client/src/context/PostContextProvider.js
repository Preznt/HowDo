import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const initPost = () => {
    const postData = {
      p_code: v4(),
      username: "",
      p_title: "",
      p_content: "",
      p_thumb: null,
      p_attachs: null,
      b_code: "",
      b_group_code: "",
    };
    return postData;
  };
  const initReply = () => {
    const replyData = {
      r_code: v4(),
      p_code: "",
      username: "",
      r_content: "",
      r_parent_code: null,
    };
    return replyData;
  };

  const [boardList, setBoardList] = useState([]);
  const [postData, setPostData] = useState(initPost);
  const [replyList, setReplyList] = useState([]);
  const [replyCount, setReplyCount] = useState();
  const [boardCode, setBoardCode] = useState("");
  const [keyValue, setKeyValue] = useState("");

  // select option
  const orderList = [
    { eng: "latest", kor: "최신순" },
    { eng: "upvotes", kor: "추천순" },
    { eng: "replies", kor: "댓글순" },
    { eng: "views", kor: "조회순" },
  ];
  const filterList = [
    { eng: "title_content", kor: "제목+내용" },
    { eng: "title", kor: "제목" },
    { eng: "content", kor: "내용" },
    { eng: "nickname", kor: "닉네임" },
    { eng: "reply", kor: "댓글" },
  ];

  const initOrder = () => {
    const order = {
      eng: `${orderList[0].eng}`,
      kor: `${orderList[0].kor}`,
    };
    return order;
  };

  const initFilter = () => {
    const filter = {
      eng: `${filterList[0].eng}`,
      kor: `${filterList[0].kor}`,
    };
    return filter;
  };

  const props = {
    boardList,
    setBoardList,
    initPost,
    postData,
    setPostData,
    initReply,
    replyList,
    setReplyList,
    replyCount,
    setReplyCount,
    boardCode,
    setBoardCode,
    keyValue,
    setKeyValue,
    orderList,
    filterList,
    initFilter,
    initOrder,
  };

  return <PostContext.Provider value={props}>{children}</PostContext.Provider>;
};
