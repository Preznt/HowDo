// 게시글 목록: Category 와 Detail 에 포함
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const List = ({ data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <li
          className="list-item p-3 border-b border-slate-300"
          key={item.b_code}
        >
          <div className="title font-semibold text-lg">{item.b_title}</div>
          <div className="date text-sm flex justify-end items-end">{`${item.b_date} ${item.b_time}`}</div>
          <div className="nickname">{item.username}</div>
          <div className="detail-box text-right">
            <EyeIcon className="inline-block h-5 w-5 text-slate-500" />
            <span className="mr-4">{item.b_views}</span>
            <HandThumbUpIcon className="inline-block h-5 w-5 text-slate-500" />
            <span className="mr-4">{item.b_replies}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block h-5 w-5 text-slate-500" />
            <span>{item.b_upvote}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <section className="commu-list w-full">
      <ul className="item-wrapper w-full">
        <ListItem />
      </ul>
    </section>
  );
};

export default List;
