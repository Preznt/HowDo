import { useState, createContext, useContext } from "react";
const AutoSearchContext = createContext();

export const useAutoSearchContext = () => {
  return useContext(AutoSearchContext);
};

export const AutoSearchContextProvider = ({ children }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");
  const [autoComplete, setAutoComplete] = useState([null]);
  const [searchedData, setSearchedData] = useState(null);
  const onChange = (e) => {
    setCurrentSearch(e.target.value);
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onKeyUp = async (e) => {
    console.log("123");
    sleep(500).then(async () => {
      const result = await fetch(`/mypage/search`);
      const keyword = await result?.json();
      setSavedKeyword([...keyword.keyword_v, ...keyword.keyword_u]);

      if (currentSearch) {
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
        setAutoComplete([...result]);
      } else return setAutoComplete([null]);
    });
  };
  const autoClick = (e) => {
    if (e.target.className.indexOf("autocomplete") === 0) {
      setCurrentSearch(e.target.innerHTML);
      setAutoComplete([null]);
    }
    setAutoComplete([null]);
  };
  const props = {
    currentSearch,
    setCurrentSearch,
    onChange,
    onKeyUp,
    autoComplete,
    setAutoComplete,
    searchedData,
    setSavedKeyword,
    autoClick,
    setSearchedData,
  };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};