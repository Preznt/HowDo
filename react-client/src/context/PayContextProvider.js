import { createContext, useContext, useState } from "react";
import { dataPayApprove, dataPayReady } from "../data/Pay";
import { useUserContext } from "./UserContextProvider";

const PayContext = createContext();

export const usePayContext = () => {
  return useContext(PayContext);
};

export const PayContextProvider = ({ children }) => {
  const { userSession } = useUserContext();
  const [statePayReady, setPayReady] = useState(dataPayReady);
  const [statePayApprove, setPayApprove] = useState(dataPayApprove);

  const payReadyBody = () => {
    setPayReady({
      ...statePayReady,
      partner_order_id: userSession.username,
      partner_user_id: userSession.username,
      item_name: userSession.username,
      // total_amount: userSession.price,
    });
    console.log(statePayReady);
  };

  const payApproveBody = () => {
    setPayApprove({
      ...statePayApprove,
      partner_order_id: userSession.username,
      partner_user_id: userSession.username,
    });
  };
  const props = {
    statePayReady,
    setPayReady,
    payReadyBody,
  };
  return <PayContext.Provider value={props}>{children}</PayContext.Provider>;
};
