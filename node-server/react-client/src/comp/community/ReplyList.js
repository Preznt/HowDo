import ReplyItem from "./ReplyItem";

const ReplyList = ({ data }) => {
  // 부모댓글만 가져올 수 있으면 filter 삭제 후 comp 통합
  const ReplyBox = () => {
    return data
      .filter((item) => {
        return !item.r_parent_code;
      })
      .map((item, index) => {
        return <ReplyItem key={item.r_code} item={item} index={index} />;
      });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
