import { UserContextProvider } from "./UserContextProvider";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";
import { AutoSearchContextProvider } from "./AutoSearchProvider";
const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <VideoContentContextProvider>
        <AutoSearchContextProvider>
          <TransferContextProvider>{children}</TransferContextProvider>
        </AutoSearchContextProvider>
      </VideoContentContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
