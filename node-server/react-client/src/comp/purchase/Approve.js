import { payApprove, subApprovalSave } from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";
import { dataPayApprove, dataSubApprovalSave } from "../../data/Pay";
import { useEffect } from "react";

const Approve = () => {
  const { userSession } = usePayContext();
  const query = window.location.search;
  const pg_token = query.substring(10, 30);
  const tid = localStorage.getItem("tid");

  dataPayApprove.tid = tid;
  dataPayApprove.pg_token = pg_token;
  dataPayApprove.partner_user_id = userSession.username;

  // 카카오페이 승인 요청

  useEffect(() => {
    (async () => {
      const result = await payApprove(dataPayApprove);
      // console.log(result);

      if (result.sid) {
        const data = new dataSubApprovalSave(
          result.partner_user_id,
          result.partner_order_id,
          result.sid,
          result.approved_at
        );
        // console.log(data);
        subApprovalSave(data);
      }
    })();
  });

  return (
    <div>
      <h1>여기는 승인 화면</h1>
    </div>
  );
};
export default Approve;
