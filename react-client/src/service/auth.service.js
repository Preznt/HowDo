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

export const payReady = async () => {
  const MY_ADMIN_KEY = "7b813e919bafe76fbeafedd41126d803";
  const tid = localStorage.getItem("tid");
  const testBody = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "초코파이",
    quantity: 1,
    total_amount: 2200,
    tax_free_amount: 0,
    approval_url: `http://localhost:5000/api/kakao/approval/${tid}`,
    fail_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  };

  const kakaoFetchOption = {
    method: "POST",
    body: new URLSearchParams(testBody),
    headers: {
      Authorization: `KakaoAK ${MY_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(
      "https://kapi.kakao.com/v1/payment/ready",
      kakaoFetchOption
    );
    const result = await res.json();
    console.log(result);
    localStorage.setItem("tid", result.tid);
    document.location.href = result.next_redirect_pc_url;
  } catch (e) {
    console.log("kakao error", e);
  }
};
