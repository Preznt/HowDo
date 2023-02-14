import { usePayContext } from "../../context/PayContextProvider";
import { payReady } from "../../service/auth.service";

const PayReady = () => {
  const { statePayReady } = usePayContext();
  console.log(statePayReady);
  return (
    <div className="flex flex-column justify-center w-full m-7">
      <div className="w-1/2">
        <div>
          <h1>상품 정보</h1>
        </div>
        <div>
          <h1>총 결제 금액:</h1>
        </div>
        <button
          onClick={() => {
            payReady(statePayReady);
          }}
        >
          <img src="/image/kakao_pay.png" className="h-8 w-15" />
        </button>
      </div>
    </div>
  );
};

export default PayReady;
