import ReplyList from "./ReplyList";
import { useLayoutEffect } from "react";
import { usePostContext } from "../../context/PostContextProvider";
import { insertReply, getReply } from "../../service/post.service";

const Reply = ({ code, list, count }) => {
  const {
    replyData,
    setReplyData,
    initReply,
    replyList,
    setReplyList,
    replyCount,
    setReplyCount,
  } = usePostContext();

  useLayoutEffect(() => {
    (async () => {
      setReplyList([...list]);
      setReplyCount(count);
      setReplyData(initReply);
    })();
  }, []);

  /**
   * Reply 를 재사용 가능한 컴포넌트로...
   * 칼럼명을 포함한 데이터와 fetch 함수를 어떻게 해야 할까?
   */

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyData({
      ...replyData,
      p_code: code,
      r_content: e.target.value,
    });
  };

  // 댓글 등록 버튼 클릭 시 fetch 및 reRendering
  const onClickReply = async () => {
    setReplyData(initReply);
    await insertReply(replyData);
    let data = await getReply(replyData.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setReplyData(initReply);
    }
  };

  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";

  return (
    <section className="m-5 w-full">
      <div className="text-lg">{`댓글 ${replyCount} 개`}</div>
      <div className="reply-input-box flex mt-5 mb-5 p-10 w-full border border-gray-300 rounded">
        {/* 사용자 nickname 필요 */}
        <input
          className={inputClass}
          type="text"
          value={replyData.r_content}
          onChange={onChangeHandler}
        />
        <button className={btnClass02} onClick={onClickReply}>
          등록
        </button>
      </div>
      <ReplyList data={replyList} />
    </section>
  );
};

export default Reply;
