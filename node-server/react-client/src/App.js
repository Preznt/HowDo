import { Outlet } from "react-router-dom";
import Nav from "./comp/NavCol";
import NavRow from "./comp/NavRow";
import "./css/App.css";
import { useAutoSearchContext } from "./context/AutoSearchProvider";
function AppSample() {
  const { autoClick } = useAutoSearchContext();
  return (
    <div className="App w3-container" onClick={autoClick}>
      <NavRow />
      <div className="flex flex-row">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}

export default AppSample;
