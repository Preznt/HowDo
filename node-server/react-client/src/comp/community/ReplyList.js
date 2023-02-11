import ReplyItem from "./ReplyItem";

const ReplyList = ({ writer, data }) => {
  // 부모댓글만 가져올 수 있으면 filter 삭제 후 comp 통합
  const ReplyBox = () => {
    return data.map((item, index) => {
      return (
        <ReplyItem
          key={item.r_code}
          writer={writer}
          item={item}
          index={index}
        />
      );
    });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
