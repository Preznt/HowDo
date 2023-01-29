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

export const getCatPosts = async (catCode) => {
  try {
    const response = await fetch(`/community/cat/${catCode}/get`);
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

export const upvotePost = async (bCode, username) => {
  try {
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ b_code: bCode, username: username }),
    };
    const response = await fetch(`/community/post/upvote`, fetchOption);
    const result = await response.json();
    if (result.MESSAGE) {
      alert(result.MESSAGE);
      return null;
    } else {
      return result;
    }
  } catch (err) {
    return null;
  }
};

export const getReply = async (bCode) => {
  try {
    const response = await fetch(`/community/reply/${bCode}/get`);
    const result = await response.json();
    // replyList, replyCount
    return result;
  } catch (err) {
    return null;
  }
};

export const insertReply = async (data) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/community/reply/insert`, fetchOption);
    const result = await response.json();
    if (result.MESSAGE) {
      alert(result.MESSAGE);
      return null;
    }
  } catch (err) {
    return null;
  }
  try {
    const result = await getReply(data.b_code);
    return result;
  } catch (err) {
    return null;
  }
};
