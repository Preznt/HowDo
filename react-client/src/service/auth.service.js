import {
  KAKAO_APP_ADMIN_KEY,
  READY_URL,
  APPROVE_URL,
} from "../config/kakao_config.js";

export const fetchJoin = async (joinUser) => {
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(joinUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/user", fetchOption);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const fetchLogin = async (loginUser) => {
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/user/login", fetchOption);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const fetchUser = async () => {
  const response = await fetch("/user/session");
  const result = await response.json();

  // console.log(result);
  return result;
};

// 결제

// 결제 승인

export const payApprove = async (pg_token) => {
  const tid = localStorage.getItem("tid");
  const reqBody = {
    cid: "TC0ONETIME",
    tid: tid,
    partner_order_id: "1001",
    partner_user_id: "user",
    pg_token: pg_token,
  };

  console.log(reqBody);

  const approveFetchOption = {
    method: "POST",
    body: new URLSearchParams(reqBody),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(APPROVE_URL, approveFetchOption);
    const result = await res.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

// 결제 준비
export const payReady = async () => {
  const testBody = {
    cid: "TC0ONETIME",
    partner_order_id: "1001",
    partner_user_id: "user",
    item_name: "초코파이",
    quantity: 1,
    total_amount: 2200,
    tax_free_amount: 0,
    approval_url: `http://localhost:3000/approval/`,
    fail_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  };

  const kakaoFetchOption = {
    method: "POST",
    body: new URLSearchParams(testBody),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(READY_URL, kakaoFetchOption);
    const result = await res.json();
    console.log(result);
    localStorage.setItem("tid", result.tid);
    document.location.href = result.next_redirect_pc_url;
  } catch (e) {
    console.log("kakao error", e);
  }
};
