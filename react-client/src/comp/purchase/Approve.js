import { payApprove, subApprovalSave } from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";
import { dataPayApprove } from "../../data/Pay";

const Approve = () => {
  const { userSession } = usePayContext();
  const query = window.location.search;
  const pg_token = query.substring(10, 30);
  const tid = localStorage.getItem("tid");

  dataPayApprove.tid = tid;
  dataPayApprove.pg_token = pg_token;
  dataPayApprove.partner_user_id = userSession.username;

  // 카카오페이 승인 요청
  let approveResult;
  const exeApprove = async () => {
    approveResult = await payApprove(dataPayApprove);

    // await subApprovalSave()
    console.log(approveResult);
  };
  exeApprove();

  return (
    <div>
      <h1>여기는 승인 화면</h1>
    </div>
  );
};
export default Approve;
