import { UserContextProvider } from "./UserContext";
import { TransferContextProvider } from "./TransferContextProvider";
import { VideoContentContextProvider } from "./VideoContentContextProvide";

const Provider = ({ children }) => {
  return (
    <UserContextProvider>
      <TransferContextProvider>
        <VideoContentContextProvider>{children}</VideoContentContextProvider>
      </TransferContextProvider>
    </UserContextProvider>
  );
};

export default Provider;
