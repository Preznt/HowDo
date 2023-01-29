// react build 하지 않으면 에디터 오류 발생
// import EditorModule from "./EditorModule";
import { submitPost } from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";

const CommuWrite = () => {
  // 카테고리, 그룹 값은 이전 페이지(게시판)에서 가져옴
  // session 체크해서 게시글의 username 이 일치할 경우 수정 삭제 버튼 표시
  // detail 페이지에서 받은 데이터를 전역 context 에 저장해야 함
  // 현재 경로를 체크해서(useLocation) 새로 글쓰는 경우와 수정하는 경우 분리
  // 새로 글쓰기는 postData 초기화 / 수정은 저장된 postData 가져옴
  // ckEditor setData 사용해야

  const { postData, setPostData } = usePostContext();

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, b_content: data });
  };

  const onClickHandler = () => {
    submitPost(postData);
  };

  return (
    <form className="post-editor">
      <input
        className="title"
        name="b_title"
        placeholder="제목"
        value={postData.b_title}
        onChange={onChangeHandler}
      />
      {/* <EditorModule data={postData.b_content} handler={onChangeContentHandler} b_code={postData.b_code} /> */}
      <button id="submit" type="button" onClick={onClickHandler}>
        등록
      </button>
    </form>
  );
};

export default CommuWrite;
