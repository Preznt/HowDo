import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const BoardList = ({ board, data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <div key={item.p_code}>
          <Link
            to={`/community/${board.b_eng}/${item.p_code}`}
            className="list-item p-3 border-b border-dashed border-slate-300"
          >
            <div className="title font-semibold text-lg">{item.p_title}</div>
            <div className="date text-sm flex justify-end items-end">{`${item.p_date} ${item.p_time}`}</div>
            <div className="nickname text-sm flex items-center">
              {item.user["nickname"]}
            </div>
            <div className="detail-box text-right">
              <EyeIcon className="inline-block h-5 w-5 text-slate-500" />
              <span className="mr-4">{item.p_views}</span>
              <HandThumbUpIcon className="inline-block h-5 w-5 text-slate-500" />
              <span className="mr-4">{item.p_upvotes}</span>
              <ChatBubbleOvalLeftEllipsisIcon className="inline-block h-5 w-5 text-slate-500" />
              <span>{item.p_replies}</span>
            </div>
          </Link>
          {/* 댓글 검색 시 표시되는 댓글 영역 */}
          {item?.replies &&
            item?.replies.map((reply) => (
              <HashLink
                className="p-5 block bg-slate-100 border-b-2 border-white"
                to={`/community/${board.b_eng}/${item.p_code}#${reply?.r_code}`}
              >
                <MinusIcon className="inline-block h-5 w-5 text-slate-500" />
                <span className="ml-5 mr-2">{`${reply?.user?.nickname} : `}</span>
                <span>{reply?.r_content}</span>
              </HashLink>
            ))}
        </div>
      );
    });
  };

  return (
    <section className="commu-list pl-5 pr-5 w-full">
      <ul className="item-wrapper w-full">
        <ListItem />
      </ul>
    </section>
  );
};

export default BoardList;
