import ReplyItem from "./ReplyItem";

const ReplyList = ({ data }) => {
  const ReplyBox = () => {
    return data.map((item, index) => {
      return <ReplyItem key={item.r_code} item={item} index={index} />;
    });
    // .filter((item) => {
    //   return !item.r_parent_code;
    // });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
