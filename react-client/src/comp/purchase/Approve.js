import { payApprove } from "../../service/auth.service";
const Approve = () => {
  const query = window.location.search;
  const pg_token = query.substring(10, 30);

  payApprove(pg_token);

  return (
    <div>
      <h1>여기는 승인 화면</h1>
    </div>
  );
};
export default Approve;
