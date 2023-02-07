import ReactPlayer from "react-player";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useAutoSearchContext } from "../../context/AutoSearchProvider";
import {
  wrapperDiv,
  nameSpan,
  videoNohover,
  searchItemwrap,
} from "../../nav/classNames/ClassNames";

// search 페이지 진입시 사용하는 데이터 fetch
export const SearchLoader = async ({ params }) => {
  const currentSearch = params.query;
  const res = await fetch(`/mypage/total/${currentSearch}`);
  const SearchR = await res.json();
  return SearchR;
};

const SearchMain = () => {
  const { searchKeyword, setSearchKeyword } = useAutoSearchContext();
  const navigate = useNavigate();
  const SearchR = useLoaderData();
  // 서칭된 아이템 클릭으로 유저 상세 페이지 진입하도록 하는 함수
  const itemClick = (item) => {
    navigate(`/creater/${item.nickname}`);
  };
  const userSearchView = SearchR?.u_result?.map((item) => {
    return (
      <div
        className={searchItemwrap}
        key={item.username}
        onClick={() => itemClick(item)}
      >
        <img
          className="w-60 h-36 place-self-center"
          src={
            item?.profile_image ? item.profile_image : "../image/noimage.png"
          }
        ></img>
        <div className="mt-4 text-center">닉네임 : {item.nickname}</div>
      </div>
    );
  });
  const videoSearchView = SearchR?.v_result?.map((item) => {
    return (
      <div className={searchItemwrap} key={item.v_code}>
        <ReactPlayer className={videoNohover} src={item.v_src}></ReactPlayer>
        <div className="mt-4 text-center">{item.v_title}</div>
        <div className="mt-4 text-center">{item.v_views}</div>
      </div>
    );
  });
  const searchNull = (
    <span className="m-auto">
      {" "}
      "{searchKeyword}"에 관한 검색결과가 없습니다
    </span>
  );

  return (
    <div className="flex flex-col ml-40 w-full">
      <span className={nameSpan}>사용자 검색 공간입니다</span>
      <div className={wrapperDiv}>
        {SearchR.u_result[0] ? userSearchView : searchNull}
      </div>
      <span className={nameSpan}>컨텐츠 검색 공간입니다</span>
      <div className={wrapperDiv}>
        {SearchR.v_result[0] ? videoSearchView : searchNull}
      </div>
      <span className={nameSpan}>게시글 검색 공간입니다</span>
      <div className={wrapperDiv}>{searchNull}</div>
      <span className={nameSpan}>댓글 검색 공간입니다</span>
      <div className={wrapperDiv}>{searchNull}</div>
    </div>
  );
};

export default SearchMain;
