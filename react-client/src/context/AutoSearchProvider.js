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
      const result = await fetch(`/search`);
      const keyword = result.json();
      console.log(keyword);
      setSavedKeyword(keyword);
    })();
  }, [currentSearch]);

  const props = { currentSearch, setCurrentSearch, onChange };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};
