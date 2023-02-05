import { SyncLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="absolute flex flex-col w-full h-full bg-gray-200 z-100 opacity-60">
      <SyncLoader color="#0000ff" className="m-auto mb-0 opacity-100" />
      <div className="m-auto mt-6 font-xl font-semibold opacity-100">
        로딩 중 입니다...
      </div>
    </div>
  );
};

export default Loading;
