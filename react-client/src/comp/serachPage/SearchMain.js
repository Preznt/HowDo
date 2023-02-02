import classNames from "classnames";
import { useAutoSearchContext } from "../../context/AutoSearchProvider";
const SearchMain = () => {
  const { searchedData } = useAutoSearchContext();
  console.log(searchedData);
  console.log(searchedData[0].profile_image);
  const wrapperDiv = classNames(
    "mt-6",
    "min-h-64",
    "w-full",
    "flex",
    "flex-col"
  );

  const nameSpan = classNames(
    "place-self-center",
    "border-b-2",
    "border-black"
  );

  const itemwrap = classNames("flex flex-col w-2/12 shadow-lg");
  const searchNull = <span className="m-auto"> 검색결과가 없습니다</span>;

  return (
    <div className="flex flex-col ml-40 w-full">
      <div className={wrapperDiv}>
        <span className={nameSpan}>크리에이터 검색 공간입니다</span>
        <div className={itemwrap}>
          <img
            src={searchedData[0].profile_image}
            className="w-60 h-36 place-self-center"
          ></img>
          <div className="mt-4 text-center">{searchedData[0].nickname}</div>
        </div>
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>컨텐츠 검색 공간입니다</span>
        <div className={itemwrap}>
          <img
            src={searchedData[1].v_thumbnail}
            className="w-60 h-36 place-self-center"
          />
          <div className="mt-4 text-center">{searchedData[1].v_title}</div>
        </div>
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>게시글 검색 공간입니다</span>
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>댓글 검색 공간입니다</span>
      </div>
    </div>
  );
};

export default SearchMain;
