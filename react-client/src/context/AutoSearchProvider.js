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
    const result = savedKeyword
      .filter((keyword) => {
        return (
          keyword.v_title?.includes(currentSearch) ||
          keyword.nickname?.includes(currentSearch)
        );
      })
      .map((keyword) => {
        return Object.values(keyword)[0];
      });
    console.log(result);
  };

  const props = { currentSearch, setCurrentSearch, onChange, onKeyUp };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};
