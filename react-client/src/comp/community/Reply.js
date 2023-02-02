import ReplyList from "./ReplyList";

const Input = ({
  replyCount,
  replyData,
  replyList,
  onChangeHandler,
  onClickReply,
}) => {
  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";

  return (
    <section className="m-5">
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

export default Input;
