import EditorModule from "./EditorModule";
import "../../css/community/Content.css";
import { submitPost } from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useRef, useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PostWrite = () => {
  const nav = useNavigate();
  const { userSession } = useUserContext();
  const { initPost, postData, setPostData } = usePostContext();
  const location = useLocation();
  const { b_code, b_eng, b_group_code } = location?.state;
  const data = location?.state?.data;
  const pCode = useParams().post;
  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    // setState 를 같은 함수 내에서 여러 번 실행하면
    // 가장 마지막 setState 만 화면에 반영된다(batch update).

    // insert
    if (!pCode) {
      const init = initPost();
      setPostData({
        ...init,
        username: userSession.username,
        b_code: b_code,
        b_group_code: b_group_code,
      });
    }
    // update
    else {
      setPostData({ ...data });
    }
  }, []);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, p_content: data });
  };

  const onClickHandler = async () => {
    console.log("title", postData.p_title.length);
    console.log("content", postData.p_content.length);
    if (postData.p_title.length < 1) {
      alert("제목을 입력하세요.");
      titleRef.current.focus();
      return null;
    }
    if (postData.p_content.length < 1) {
      alert("내용을 입력하세요.");
      return null;
    }
    if (!userSession?.username) {
      alert("세션이 만료되었습니다.\n로그인 후 다시 시도해주세요.");
      return null;
    }
    let result;
    let data;
    const image = document?.querySelector(".ck-content img");
    if (image) {
      const index = Array?.from(image?.src).lastIndexOf("/");
      const url = image?.src?.slice(index + 1);
      data = { ...postData, p_thumb: url };
    } else {
      data = { ...postData, p_thumb: null };
    }
    // insert
    if (!pCode) result = await submitPost(data);
    // update
    if (pCode) result = await submitPost(data, pCode);
    if (result.MESSAGE) {
      nav(`/community/${b_eng}`, { replace: true });
    }
    return null;
  };

  return (
    <form className="post-editor">
      {/* 게시판 리스트 버튼 나열 */}
      <div></div>
      <input
        className="title w-full p-1 pl-2 mb-2 border border-[#ccced1] focus:outline-none focus:border-[#2977ff]"
        name="p_title"
        placeholder="제목"
        value={postData.p_title}
        onChange={onChangeHandler}
        ref={titleRef}
      />
      <EditorModule
        data={postData.p_content}
        handler={onChangeContentHandler}
        code={postData.p_code}
      />
      <button
        id="submit"
        className={`m-6 float-right ${btnClass}`}
        type="button"
        onClick={onClickHandler}
      >
        등록
      </button>
    </form>
  );
};

export default PostWrite;
