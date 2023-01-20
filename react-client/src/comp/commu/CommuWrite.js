// 댓글 개수 칼럼 추가해서 댓글 개수가 변할 때마다 게시글 테이블 update?
// 아니면 매번 댓글 개수 count?
// 카테고리 => 토픽 테이블 구조는?

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";

const CommuWrite = () => {
  const topicList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "life", kor: "생활" },
    { eng: "issue", kor: "이슈" },
  ];

  const initPost = () => {
    const postData = {
      postid: "",
      topic: "",
      username: "",
      title: "",
      content: "",
      createdDate: "",
      updatedDate: "",
      deletedDate: "",
      votes: 0,
      views: 0,
    };
    return postData;
  };

  const [postData, setPostData] = useState(initPost);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, content: data });
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  // topicList 배열을 이용하여 checkbox 요소 동적 추가
  const checkboxList = topicList.map((topic) => {
    return (
      <div className="topic-item" key={topic.eng}>
        <input
          type="radio"
          id={topic.eng}
          value={topic.eng}
          name="topic"
          onChange={onChangeHandler}
        />
        <label htmlFor={topic.eng}>{topic.kor}</label>
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
        className="title"
        name="title"
        placeholder="제목"
        value={postData.title}
        onChange={onChangeHandler}
      />
      <CKEditor
        className="content"
        editor={Editor}
        config={Editor.defaultConfig}
        data="<p></p>"
        onReady={(editor) => {}}
        onChange={onChangeContentHandler}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <button id="submit" type="button">
        등록
      </button>
    </form>
  );
};

export default CommuWrite;
