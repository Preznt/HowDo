export const fetchJoin = async (joinUser) => {
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(joinUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/regist", fetchOption);
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

  const response = await fetch("/regist/login", fetchOption);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const fetchUser = async () => {
  const response = await fetch("/regist/session");
  const result = await response.json();

  return result;
};
