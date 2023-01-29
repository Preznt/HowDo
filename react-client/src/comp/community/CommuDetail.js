// 게시글 상세보기
import Reply from "./Reply";
import "../../css/community/CommuDetail.css";
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  insertReply,
  upvotePost,
} from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정
// 댓글을 중첩 구조로 데이터 가공해야 하는지?
// 카테고리 데이터 어떻게 해야?? 테이블 생성?

const CommuDetail = () => {
  const { postData, setPostData, replyData, setReplyData, initReply } =
    usePostContext();
  const [upvote, setUpvote] = useState(null);
  const [replyCount, setReplyCount] = useState(null);
  const [replyList, setReplyList] = useState([]);

  // 임시 게시글 코드
  const bCode = "e4b9ae36-02b0-4728-9742-9bb4ae636eca";
  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  // 카테고리, 그룹 값은 이전 페이지(게시판)에서 가져옴
  // detail 페이지에서 fetch 데이터를 전역 context 에 저장해야 함
  // session 체크해서 게시글의 username 과 일치할 경우 수정 삭제 버튼 표시
  // 현재 경로를 체크해서 새로 글쓰는 경우와 수정하는 경우 분리
  // 수정은 저장된 postData 가져옴
  // 새로 글쓰기 전후로 postData 초기화해야
  // ckEditor setData 또는 initData 사용

  useLayoutEffect(() => {
    (async () => {
      const postResult = await getDetailPost(bCode);
      const replyResult = await getReply(bCode);
      if (postResult) {
        setPostData({ ...postResult });
        setUpvote(postResult.b_upvote);
        setReplyList([...replyResult.replyList]);
        setReplyCount(replyResult.replyCount.b_replies);
        setReplyData({ ...replyData, b_code: bCode });
      }
      return null;
    })();
  }, []);

  const onClickUpvote = async () => {
    // 임시 username(session context 에서)
    const username = "polly@gmail.com";
    const result = await upvotePost(bCode, username);
    if (result) setUpvote(upvote + result[0]);
  };

  const onChangeHandler = (e) => {
    setReplyData({ ...replyData, r_content: e.target.value });
  };

  const onClickReply = async () => {
    const result = await insertReply(replyData);
    if (result) {
      setReplyList([...result.replyList]);
      setReplyCount(result.replyCount.b_replies);
      setReplyData(initReply);
    }
  };

  return (
    <>
      <main className="commu-detail p-5 rounded border border-slate-300">
        <section className="category p-2">{postData.b_category}</section>

        <section className="flex p-2 border-b border-slate-300">
          <div className="title flex-1 text-lg font-semibold">
            {postData.b_title}
          </div>
          <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span className="mr-4">{postData.b_views}</span>
          <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span className="mr-4">{upvote}</span>
          <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span>{postData.r_count || "0"}</span>
        </section>

        <section className="p-2">
          <img className="inline-block w-50" alt="프로필 이미지" />
          {/* 나중에 nickname으로 수정 */}
          <span className="nickname pl-2">{postData.username}</span>
          <span className="float-right">{`${postData.b_date} ${postData.b_time}`}</span>
        </section>

        <section className="flex flex-col items-center w-full p-20">
          <div
            className="content w-full pb-20"
            dangerouslySetInnerHTML={{ __html: postData.b_content }}
          ></div>

          <button className={btnClass} onClick={onClickUpvote}>
            <div>{upvote}</div>
            <HandThumbUpIcon className="inline-block m-1 mb-2 h-5 w-5" />
            추천
          </button>
        </section>

        <section className="button-box flex justify-end w-full">
          <button className={`${btnClass} mr-4`}>수정</button>
          <button className={btnClass}>삭제</button>
        </section>
        <div>{`${replyCount || 0} 개의 댓글`}</div>
        <div className="reply-input-box flex p-5 w-full">
          <input
            className="flex-1"
            value={replyData.r_content}
            onChange={onChangeHandler}
          />
          <button onClick={onClickReply}>게시</button>
        </div>

        <Reply data={replyList} />
      </main>
    </>
  );
};

export default CommuDetail;
