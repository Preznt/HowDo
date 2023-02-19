import { createContext, useContext, useState } from "react";
import { dataPayReady, dataPayApprove, dataSubApprovalSave } from "../data/Pay";
import { useUserContext } from "./UserContextProvider";

const PayContext = createContext();

export const usePayContext = () => {
  return useContext(PayContext);
};

export const PayContextProvider = ({ children }) => {
  const { userSession } = useUserContext();
  const [statePayReady, setPayReady] = useState(dataPayReady);
  const [approve, setApprove] = useState({});
  const [dataBody, setDataBody] = useState(dataPayApprove);
  // const [statePayApprove, setPayApprove] = useState(dataPayApprove);

  const payReadyBody = (orderUser, price, item, v_code, nickname) => {
    if (item) {
      setPayReady({
        ...statePayReady,
        cid: "TC0ONETIME",
        partner_user_id: userSession.username,
        partner_order_id: orderUser,
        item_name: item,
        total_amount: price,
        item_code: v_code,
      });
    } else {
      setPayReady({
        ...statePayReady,
        cid: "TCSUBSCRIP",
        partner_user_id: userSession.username,
        partner_order_id: orderUser,
        item_name: orderUser,
        total_amount: price,
      });
      localStorage.setItem("order_id", orderUser);
      localStorage.setItem("nickname", nickname);
    }
  };

  const props = {
    statePayReady,
    setPayReady,
    payReadyBody,
    approve,
    setApprove,
    dataBody,
    setDataBody,
    userSession,
  };
  return <PayContext.Provider value={props}>{children}</PayContext.Provider>;
};
