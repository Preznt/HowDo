import { usePayContext } from "../../context/PayContextProvider";
import { payReady } from "../../service/auth.service";

const PayReady = () => {
  const { statePayReady } = usePayContext();
  const v_src = localStorage.getItem("v_src");
  console.log(statePayReady);
  return (
    <div className="flex flex-column justify-center w-full m-8">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-5">주문 / 결제</h1>
        {/* <input type="checkbox" /> */}
        <h1 className="text-2xl font-bold mb-3">상품정보</h1>
        <div className="flex justify-between">
          <div className="flex">
            <video src={v_src} className="w-80 mr-3" />
            <div className="grid">
              <p className="text-xl font-semibold">
                {statePayReady?.item_name}
              </p>
              <p>아티스트 : {statePayReady?.partner_order_id}</p>
              <p className="flex items-center">
                가격 :
                <p className="text-2xl font-bold">
                  {statePayReady?.total_amount}
                </p>
                원
              </p>
            </div>
          </div>
          <div className="grid p-5 bg-blue-100 rounded-xl w-1/4">
            <h1>총 금액</h1>
            <p className="text-2xl font-bold">
              {statePayReady?.total_amount}원
            </p>
            <button
              className="place-self-end"
              onClick={() => {
                payReady(statePayReady);
              }}
            >
              <img src="/image/kakao_pay.png" className="h-8 w-15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayReady;
