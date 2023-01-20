import { createBrowserRouter } from "react-router-dom";
import AppSample from "../AppSample";
import MainPage from "../comp/MainPage";
import MainBar from "../comp/MainBar";
import Join from "../comp/login/Join";
import LoginModal from "../comp/login/LoginModal";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: "" },
      { path: "/regist", element: <Join /> },
    ],
  },
]);

export default router;
