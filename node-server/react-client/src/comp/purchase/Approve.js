import {
  payApprove,
  subApprovalSave,
  oneApprovalSave,
} from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";
import {
  dataPayApprove,
  dataSubApprovalSave,
  dataOneApprovalSave,
} from "../../data/Pay";
import { useEffect } from "react";
import moment from "moment";
import uuid from "react-uuid";

const Approve = () => {
  const { userSession, approve, setApprove } = usePayContext();
  const query = window.location.search;
  const pg_token = query.substring(10, 30);
  const tid = localStorage.getItem("tid");
  const order_id = localStorage.getItem("order_id");
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    dataPayApprove.cid = "TC0ONETIME";
  }
  dataPayApprove.tid = tid;
  dataPayApprove.pg_token = pg_token;
  dataPayApprove.partner_user_id = userSession.username;
  dataPayApprove.partner_order_id = order_id;

  useEffect(() => {
    (async () => {
      // 카카오페이 승인 요청
      const result = await payApprove(dataPayApprove);
      if (result.approved_at) {
        await setApprove({ ...result });
      }
      // console.log(result);

      if (result.sid) {
        const data = new dataSubApprovalSave(
          result.partner_user_id,
          result.partner_order_id,
          result.sid,
          result.approved_at.substr(0, 10),
          result.approved_at.substr(0, 10)
        );
        console.log(data);
        // 승인 응답 데이터 저장하기
        await subApprovalSave(data);
      } else if (result.cid) {
        const data = new dataOneApprovalSave(
          uuid(),
          result.partner_user_id,
          result.item_code,
          result.payment_method_type
        );
        console.log(data);
        oneApprovalSave(data);
      }
    })();
  });

  console.log(approve);

  const nextPay = moment(approve?.approved_at)
    .add(30, "d")
    .format("YYYY-MM-DD");
  console.log(nextPay);

  return (
    <div className="flex flex-column  justify-center w-full mt-12">
      <div className="grid gap-4 border w-1/2 p-4">
        <h1 className="text-3xl font-bold">결제가 완료되었습니다</h1>
        <div className="">
          <p>결제일시: {approve?.approved_at}</p>
          <p>결제금액: {approve?.amount?.total}원</p>
          <p>다음결제일: {nextPay}</p>
        </div>
        <div className="flex justify-end">
          {approve?.sid ? (
            <button
              className="mr-2 p-2 hover:bg-gray-500 hover:text-white border-2 border-gray font-semibold rounded-full"
              onClick={() => {
                document.location.href = `/creater/${nickname}`;
              }}
            >
              이어서 보기
            </button>
          ) : null}

          <button className="p-2 hover:bg-sky-600 rounded-full hover:text-white font-semibold border-2">
            구매내역 확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default Approve;
