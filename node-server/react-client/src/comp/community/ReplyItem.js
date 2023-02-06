
import { useState, useRef } from "react";

const ReplyItem = ({ data, item }) => {
  const itemRef = useRef(null);
  const [inputData, setInputData] = useState();

  const ShowChildReply = () => {
    itemRef.current.style.display = "flex";

import { useState } from "react";
import { getReply, insertReply, deleteReply } from "../../service/post.service";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";

const ReplyItem = ({ item, index }) => {
  const { userSession } = useUserContext();
  console.log("item", item);
  const { setReplyList, setReplyCount, initReply, cReplyData, setCReplyData } =
    usePostContext();
  const [inputValues, setInputValues] = useState([]);
  const [showChild, setShowChild] = useState(false);

  // map으로 생성한 여러 input state 관리. 아래 주석 참고
  const onChangeCReply = (event, index) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };

  // cf) eventHandler 에 값을 전달해야 할 경우 중첩 callback 을 사용해야 한다.
  // cf) 함수의 코드가 전부 실행된 이후에 state의 값이 변경된다.
  // 문제1. insert 함수 실행 전 setState 해야
  // 문제2. 대댓글 표시 방법
  const onClickCReply = async (index) => {
    await setCReplyData({
      ...cReplyData,
      username: userSession.username,
      p_code: item.p_code,
      r_content: inputValues[index],
      r_parent_code: item.r_code,
    });
    console.log(cReplyData);
    await insertReply(cReplyData);
    let data = await getReply(cReplyData.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setCReplyData(initReply);
    }
  };

  const onClickDelete = async () => {
    await deleteReply(item.r_code, item.p_code);
    let data = await getReply(item.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
    }
  };

  const ShowChildReply = () => {
    setShowChild(!showChild);

  };

  return (
    <li className="list-none w-full p-5 border-b border-gray-200 first:border-t">
      <div className="flex">

        <img className="inline-block mr-3" alt="프로필 이미지" />
        <span className="flex-1">{item.username}</span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>
      <div className="w-full flex justify-end">
        <button>수정</button>
        <button>삭제</button>
      </div>
      {item.r_content && (
        <>
          <button onClick={ShowChildReply}>
            {item.r_count ? `${item.r_count} 개의 댓글` : "댓글 입력"}
          </button>
          {item.r_parent_code === item.r_code ? (
            <ReplyItem ref={itemRef} item={item} style={{ display: "none" }} />
          ) : null}
          <div className="reply-input-box flex w-full">
            <input className="flex-1" />
            <button>게시</button>
          </div>
        </>
      )}

        <img
          className="inline-block mr-3"
          src={item["user.profile_image"]}
          alt="profile"
        />
        <span className="flex-1">{item?.user["nickname"]}</span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>

      {userSession?.username === item?.username && (
        <div className="w-full flex justify-end">
          <button onClick={onClickDelete}>삭제</button>
        </div>
      )}

      <button onClick={ShowChildReply}>
        {item.r_count
          ? `${item.r_count} 개의 댓글`
          : userSession?.username
          ? "댓글 입력"
          : ""}
      </button>

      <section
        style={{
          display: showChild === true ? "block" : "none",
        }}
      >
        {item?.reply_child?.map((child, index) => {
          <ReplyItem item={child} index={index} />;
        })}

        <div
          className="reply-input-box gap-3 w-full"
          style={{
            display: userSession?.username && item.r_content ? "flex" : "none",
          }}
        >
          <img
            className="rounded-full flex items-center w-50 h-50"
            src={userSession?.profile_image}
            alt="profile"
          />
          <div className="flex items-center">{userSession?.nickname}</div>
          <input
            onChange={(event) => onChangeCReply(event, index)}
            className="flex-1"
            value={inputValues[index] || ""}
            placeholder={
              !userSession?.username
                ? "로그인 후 이용해주세요."
                : "댓글을 입력하세요."
            }
            disabled={!userSession?.username ? true : false}
          />
          <button
            disabled={
              !userSession?.username && cReplyData.r_content.length < 1
                ? true
                : false
            }
            onClick={() => onClickCReply(index)}
          >
            등록
          </button>
        </div>
      </section>

    </li>
  );
};

export default ReplyItem;

/**
 * cf) map 을 이용해 생성한 여러 input 의 state 관리법
 *   단순히 event.target.value 를 저장할 경우
 *   모든 input 의 값이 동일하게 처리되는 문제 발생
 * 1. map 에서 각 input 의 index 를 저장
 * 2. 별도의 배열 state변수를 생성
 * 3. input 의 value 를 배열 state변수[index] 로 지정
 * 4. onChange 시 event 와 함께 callback 함수 호출
 * 5. 해당 callback 내에서 eventHandler를 event, index 와 함께 다시 callback 호출
 * 6. handler에서는 변수를 별도로 생성하여 배열 state변수를 spread(배열 복사)
 * 7. 새로 생성된 배열 변수의 index 에 해당하는 값에 event.target.value 저장
 * 8. setState의 인수로 새로운 배열 변수를 넘겨줌
 *    만약 3번째 input 에 값이 입력되면 [undefined, undefined, "문자열"] 이 저장됨
 */

