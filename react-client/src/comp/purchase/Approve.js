import { payApprove } from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";

const Approve = () => {
  const { userSession } = usePayContext();
  const query = window.location.search;
  const pg_token = query.substring(10, 30);
  const tid = localStorage.getItem("tid");

  const dataPayApprove = {
    cid: "TCSUBSCRIP",
    tid: tid,
    partner_order_id: userSession.username,
    partner_user_id: userSession.username,
    pg_token: pg_token,
  };

  try {
    const result = payApprove(dataPayApprove);
    console.log(result);
  } catch (error) {
    console.log(error.messgae);
  }

  return (
    <div>
      <h1>여기는 승인 화면</h1>
    </div>
  );
};
export default Approve;
