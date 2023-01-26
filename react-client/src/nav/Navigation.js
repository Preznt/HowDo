import { createBrowserRouter } from "react-router-dom";
import AppSample from "../AppSample";
import MainPage from "../comp/mainpage/MainPage";
import MainBar from "../comp/MainBar";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import LoginModal from "../comp/login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/regist", element: <Join /> },
      { path: "/regist/login", element: <Login /> },
      { path: "/creater", element: <MyPageMain /> },
    ],
  },
]);

export default router;
