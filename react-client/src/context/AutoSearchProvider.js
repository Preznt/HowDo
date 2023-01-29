import { useState, createContext, useContext, useEffect } from "react";

const AutoSearchContext = createContext();

export const useAutoSearchContext = () => {
  return useContext(AutoSearchContext);
};

export const AutoSearchContextProvider = ({ children }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");

  const onChange = (e) => {
    setCurrentSearch(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const result = await fetch(`/mypage/search/search`);
      const keyword = await result?.json();
      // console.log(keyword);
      setSavedKeyword([...keyword.keyword_v, ...keyword.keyword_u]);
      // console.log(savedKeyword);
    })();
  }, [currentSearch]);

  const onKeyUp = () => {
    return savedKeyword.map((keyword) => {
      const regex = new RegExp(currentSearch, "giu");
      const result = keyword.v_title.match(regex);
      console.log(result);
      // const regex = new RegExp(currentSearch, "gi");
      // const result = keyword.nickname.match(regex);
      // console.log(result);
    });
  };

  const props = { currentSearch, setCurrentSearch, onChange, onKeyUp };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};
