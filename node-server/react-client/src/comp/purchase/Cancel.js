import { useUserContext } from "../../context/UserContextProvider";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { cancelUser } from "../../service/auth.service";
import { useNavigate } from "react-router-dom";

const Cancel = (props) => {
  const { modal, cancelHandler, userSession } = useUserContext();
  const { orderUser, nickname } = props;
  const nav = useNavigate();

  return (
    <div>
      <div
        className={
          modal.cancel
            ? "fixed top-0 left-0 h-full w-full bg-zinc-800 opacity-40"
            : ""
        }
        onClick={cancelHandler}
      ></div>
      <div
        className={
          modal.cancel
            ? "fixed w-1/4 h-1/4 top-1/3 left-1/3 bg-white rounded-2xl p-3"
            : "hidden"
        }
      >
        <div className="flex justify-between border-b-2">
          <h1>취소하기</h1>
          <XMarkIcon
            className="h-7 w-7 cursor-pointer"
            onClick={cancelHandler}
          />
        </div>
        <div className="grid gap-6 place-content-center">
          <div className="my-8">
            <p>정말 구독을 취소하시겠습니까?</p>
          </div>
          <button
            className="p-3 w-full bg-sky-600 rounded-full text-white"
            onClick={() => {
              cancelUser(userSession.username, orderUser);
              cancelHandler();
              document.location.href = `/creater/${nickname}`;
            }}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
