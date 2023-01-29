export const submitPost = async (data) => {
  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch("/community/post/insert", fetchOption);
    const result = await response.json();
    alert(result.MESSAGE);
  } catch (err) {
    return null;
  }
};

export const getMainPosts = async () => {
  try {
    const response = await fetch("/community/posts/get");
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getDetailPost = async (bCode) => {
  try {
    const response = await fetch(`/community/post/${bCode}/get`);
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const deletePost = async (bCode) => {
  try {
    const response = await fetch(`/community/post/${bCode}/delete`);
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};
