import { KAKAO_APP_ADMIN_KEY, URL } from "../config/kakao_config.js";

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

// 결제 준비
export const payReady = async (statePayReady) => {
  console.log(statePayReady);

  const FetchOption = {
    method: "POST",
    body: new URLSearchParams(statePayReady),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.READY, FetchOption);
    const result = await res.json();
    console.log(result);
    localStorage.setItem("tid", result.tid);
    document.location.href = result.next_redirect_pc_url;
  } catch (e) {
    console.log(e.message);
  }
};

// 결제 승인

export const payApprove = async (dataPayApprove) => {
  console.log(dataPayApprove);
  const FetchOption = {
    method: "POST",
    body: new URLSearchParams(dataPayApprove),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.APPROVE, FetchOption);
    const result = await res.json();
    // console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

// 정기 결제 승인완료한 데이터 저장하기 위한 fetch

export const subApprovalSave = async () => {
  const FetchOption = {
    method: "POST",
    body: JSON.stringify(),
    headers: { "Content-Type": "application/json" },
  };

  await fetch("/kakao/sub");
};

// 정기  결제 요청

export const subscriptionPay = async () => {
  const FetchOption = {
    method: "POST",
    body: new URLSearchParams(),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(URL.SUBSCRIPTION, FetchOption);
    const result = res.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
