import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "../../context/UserContextProvider";

const Purchase = (props) => {
  const { modal } = props;

  return (
    <div className="relative">
      <div
        className={
          modal.open ? "fixed w-1/3 top-1/3 left-1/3 bg-white" : "hidden"
        }
      >
        <div className="flex justify-between border-2 bar">
          <h3>구독</h3>
          <div className="h-5 w-5 ">
            <XMarkIcon />
          </div>
        </div>
        <div className="content">
          <div>
            <h1>구독하기</h1>
          </div>
          <div>
            <h2>가격/월</h2>
            <button className="p-2 rounded-full text-white bg-sky-600">
              구독하기
            </button>
            <p>
              국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의
              발전에 노력하여야 한다. 국가안전보장회의는 대통령이 주재한다.
              헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차,
              내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 대통령은 국가의
              안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여
              긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의
              효력을 가지는 명령을 발할 수 있다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
