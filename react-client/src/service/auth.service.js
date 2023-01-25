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
