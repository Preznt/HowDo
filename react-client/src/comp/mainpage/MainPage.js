import MainpageBbs from "./MainPageBbs";
import MainpageContent from "./MainPageContent";
import MainButton from "./MainButton";
import MainContentRow from "./MainContentRow";
const MainPage = () => {
  return (
    <div className="relative">
      <MainButton />
      <MainpageBbs />
      <MainpageContent />
      <MainContentRow />
    </div>
  );
};

export default MainPage;
