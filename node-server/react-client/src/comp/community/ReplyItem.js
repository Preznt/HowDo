import { useState, useRef } from "react";
import { getReply, deleteReply } from "../../service/post.service";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";

const ReplyItem = ({ data, item }) => {
  const { userSession } = useUserContext();
  const { setReplyList, setReplyCount } = usePostContext();
  const itemRef = useRef(null);
  const [rReplyData, setrReplyData] = useState();

  const onClickDelete = async () => {
    await deleteReply(item.r_code, item.p_code);
    let data = await getReply(item.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
    }
  };

  const ShowChildReply = () => {
    itemRef.current.style.display = "flex";
  };

  return (
    <li className="list-none w-full p-5 border-b border-gray-200 first:border-t">
      <div className="flex">
        <img
          className="inline-block mr-3"
          src={item["user.profile_image"]}
          alt="profile"
        />
        <span className="flex-1">{item["user.nickname"]}</span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>

      {userSession?.username === item?.username && (
        <div className="w-full flex justify-end">
          <button>수정</button>
          <button onClick={onClickDelete}>삭제</button>
        </div>
      )}
      {item.r_content && (
        <>
          <button onClick={ShowChildReply}>
            {item.r_count ? `${item.r_count} 개의 댓글` : "댓글 입력"}
          </button>
          {item.r_parent_code === item.r_code ? (
            <ReplyItem ref={itemRef} item={item} style={{ display: "none" }} />
          ) : null}
          <div className="reply-input-box flex w-full">
            <input
              className="flex-1"
              // value={rReplyData.r_content}
              placeholder={
                !userSession?.username
                  ? "로그인 후 이용해주세요."
                  : "댓글을 입력하세요."
              }
              disabled={!userSession?.username ? true : false}
            />
            <button
            // disabled={
            //   !userSession?.username || rReplyData.r_content.length < 1
            // }
            >
              게시
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ReplyItem;
