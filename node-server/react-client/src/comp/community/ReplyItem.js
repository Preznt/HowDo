import { useLayoutEffect, useState } from "react";
import {
  getReply,
  getCReply,
  insertReply,
  deleteReply,
} from "../../service/post.service";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const ReplyItem = ({ item, index }) => {
  const { userSession } = useUserContext();
  const { initReply, setReplyList, setReplyCount } = usePostContext();
  const [showChild, setShowChild] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [cReplyInput, setCReplyInput] = useState(initReply);
  const [cReplyList, setCReplyList] = useState([]);
  const [cReplyCount, setCReplyCount] = useState(item.r_children);

  const adf = async () => {
    if (window?.location?.hash) {
      const rCode = window.location.hash.slice(1);
      let data = await fetch(`/community/creply/${rCode}/sibling/get`);
      data = await data.json();
      console.log(data);

      // !! how to manage state variable of recursive component !!
      // if (data) {
      //   setCReplyList([...data]);
      //   setShowChild(true);
      // }
    }
  };

  useLayoutEffect(() => {
    adf();
  }, []);

  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const imgDefault = "inline-block h-10 w-10 text-slate-500";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";

  // map으로 생성한 여러 input state 관리. 아래 주석 참고
  const onChangeCReply = (event, index) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };

  // cf) eventHandler 에 값을 전달해야 할 경우 중첩 callback 을 사용해야 한다.
  // cf) 함수의 코드가 전부 실행된 이후에 state의 값이 변경된다.
  // !! state 값이 setting 되기 전에 함수가 먼저 호출되는 문제 !! => function updater 로 해결
  const onClickCReply = async (index) => {
    // cf) function updater
    // setState 내에서 callback 실행
    // 매개변수는 현재 state 값, callback 에서 return 되는 값은 state 에 저장될 값
    // 저장할 값을 변수로 선언하고 fetch 함수를 호출했다.
    setCReplyInput(async (reply) => {
      reply = {
        ...cReplyInput,
        username: userSession.username,
        p_code: item.p_code,
        r_content: inputValues[index],
        r_parent_code: item.r_code,
      };
      await insertReply(reply);
      let data = await getCReply(reply.r_parent_code);
      if (data) {
        setCReplyList([...data]);
        setCReplyInput(initReply);
        setCReplyCount(cReplyCount + 1);
        setInputValues([]);
      }
      return reply;
    });
    setShowChild(true);
  };

  const onClickDelete = async () => {
    await deleteReply(item.r_code);
    if (item.r_parent_code) {
      let data = await getCReply(item.r_parent_code);
      console.log(data);
      // 부모 댓글의 데이터가 업데이트 되는 것이 아니라 선택된 댓글 기준으로 되는 듯??
      if (data) {
        setCReplyList([...data]);
        setCReplyCount(cReplyCount - 1);
      }
    }
    if (!item.r_parent_code) {
      let data = await getReply(item.p_code);
      if (data) {
        setReplyList([...data.list]);
        setReplyCount(data.count);
      }
    }
  };

  const ShowChildReply = async (rCode) => {
    let data = await getCReply(rCode);
    if (data) {
      setCReplyList([...data]);
      setShowChild(!showChild);
    }
  };

  return (
    <li
      className="list-none w-full px-10 pt-5 border-gray-200 last:border-b-0 border-b"
      id={item?.r_code}
      style={{
        backgroundColor:
          window?.location?.hash === `#${item?.r_code}` && "#fbf9f6",
      }}
    >
      <div className="flex">
        {item?.user?.profile_image ? (
          <img
            className="inline-block mr-3 w-10 h-10"
            src={item["user.profile_image"]}
            alt="profile"
          />
        ) : (
          <UserCircleIcon className={imgDefault} />
        )}
        <span className="flex items-center flex-1 ml-3">
          {item?.user["nickname"]}
        </span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>

      {userSession?.username === item?.username && (
        <div className="w-full flex justify-end">
          <button className="hover:text-blue-700" onClick={onClickDelete}>
            삭제
          </button>
        </div>
      )}

      <button
        className={`hover:text-blue-700 mb-5 ${
          showChild ? "text-blue-700" : ""
        }`}
        onClick={() => ShowChildReply(item.r_code)}
      >
        {cReplyCount
          ? `${cReplyCount} 개의 댓글`
          : userSession?.username
          ? "댓글 입력"
          : ""}
      </button>

      <section
        style={{
          display: showChild === true ? "block" : "none",
        }}
      >
        <div
          className="reply-input-box gap-3 w-full p-5 mb-5 border border-gray-300 rounded"
          style={{
            display: userSession?.username && item.r_content ? "flex" : "none",
          }}
        >
          {userSession?.profile_image ? (
            <img
              className="rounded-full flex items-center w-10 h-10"
              src={userSession?.profile_image}
              alt="profile"
            />
          ) : (
            <UserCircleIcon className={imgDefault} />
          )}
          <div className="flex items-center">{userSession?.nickname}</div>
          <input
            onChange={(event) => onChangeCReply(event, index)}
            className={inputClass}
            value={inputValues[index] || ""}
            placeholder={
              !userSession?.username
                ? "로그인 후 이용해주세요."
                : "댓글을 입력하세요."
            }
            disabled={!userSession?.username ? true : false}
          />
          <button
            className={btnClass02}
            disabled={
              !userSession?.username || inputValues[index] < 1 ? true : false
            }
            onClick={() => onClickCReply(index)}
          >
            등록
          </button>
        </div>
        {cReplyList?.map((child, index) => (
          <ReplyItem key={child.r_code} item={child} index={index} />
        ))}
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
