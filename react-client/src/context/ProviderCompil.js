import { UserContextProvider } from "./UserContextProvider";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";
import { PostContextProvider } from "./PostContextProvider";

const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <TransferContextProvider>
          <PostContextProvider>{children}</PostContextProvider>
        </TransferContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
