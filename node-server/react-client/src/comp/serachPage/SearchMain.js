import ReactPlayer from "react-player";
import { useAutoSearchContext } from "../../context/AutoSearchProvider";
import {
  wrapperDiv,
  nameSpan,
  itemwrap,
 
  videoNohover,

 mater
} from "../../nav/classNames/ClassNames";
const SearchMain = () => {
  const { searchedData } = useAutoSearchContext();

  const userSearchView = searchedData?.u_result?.map((item) => {
    return (
      <div className={itemwrap} key={item.username}>
        <img
          className="w-60 h-36 place-self-center"
          src={item?.profile_image ? item.profile_image : "./image/noimage.png"}
        ></img>
        <div className="mt-4 text-center">닉네임 : {item.nickname}</div>
      </div>
    );
  });
  const videoSearchView = searchedData?.v_result?.map((item) => {
    return (
      <div className={itemwrap} key={item.v_code}>
 
        <ReactPlayer className={videoNohover} src={item.v_src}></ReactPlayer>

        <ReactPlayer
          className="w-60 h-36 place-self-center"
          src={item.v_src}
        ></ReactPlayer>
 
        <div className="mt-4 text-center">{item.v_title}</div>
        <div className="mt-4 text-center">{item.t_views}</div>
      </div>
    );
  });
  const searchNull = <span className="m-auto"> 검색결과가 없습니다</span>;

  return (
    <div className="flex flex-col ml-40 w-full">
      <span className={nameSpan}>사용자 검색 공간입니다</span>
      <div className={wrapperDiv}>
 
        {searchedData.u_result ? userSearchView : searchNull}
      </div>
      <span className={nameSpan}>컨텐츠 검색 공간입니다</span>
      <div className={wrapperDiv}>
        {searchedData.v_result ? videoSearchView : searchNull}
      </div>
      <span className={nameSpan}>게시글 검색 공간입니다</span>
      <div className={wrapperDiv}>{searchNull}</div>
      <span className={nameSpan}>댓글 검색 공간입니다</span>
      <div className={wrapperDiv}>{searchNull}</div>

        {searchedData?.u_result ? userSearchView : searchNull}
      </div>
   

  );
};

export default SearchMain;
