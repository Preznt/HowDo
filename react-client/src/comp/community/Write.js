// 댓글 개수 칼럼 추가해서 댓글 개수가 변할 때마다 게시글 테이블 update?
// 아니면 매번 댓글 개수 count?
// 카테고리 => 토픽 테이블 구조는?

import { useEffect, useState } from "react";
// react build 전까지 에디터 보류
// import Editor from "./EditorModule";

const Write = () => {
  const catList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "life", kor: "생활" },
    { eng: "issue", kor: "이슈" },
  ];

  const initPost = () => {
    const postData = {
      b_code: "",
      username: "",
      b_title: "",
      b_content: "",
      b_category: "",
      b_date: "",
      b_time: "",
      b_update: "",
      b_delete: "",
      b_views: "",
      b_upvote: "",
      b_group: "",
    };
    return postData;
  };

  const [postData, setPostData] = useState(initPost);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, [e.target.name]: data });
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  // topicList 배열을 이용하여 checkbox 요소 동적 추가
  const checkboxList = catList.map((cat) => {
    return (
      <div className="cat-check" key={cat.eng}>
        <input
          type="radio"
          id={cat.eng}
          value={cat.eng}
          name="b_category"
          onChange={onChangeHandler}
        />
        <label htmlFor={cat.eng}>{cat.kor}</label>
      </div>
    );
  });

  return (
    <form className="post-editor">
      <div className="topic-group">
        <div>카테고리</div>
        {checkboxList}
      </div>
      <input
        className="b_title"
        name="b_title"
        placeholder="제목"
        value={postData.b_title}
        onChange={onChangeHandler}
      />
      {/* <Editor
        className="b_content"
        name="b_content"
        onChangeHandler={onChangeContentHandler}
      /> */}
      <button id="submit" type="button">
        등록
      </button>
    </form>
  );
};

export default Write;
