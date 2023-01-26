import { createBrowserRouter } from "react-router-dom";
import AppSample from "../AppSample";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import LoginModal from "../comp/login/LoginModal";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/regist", element: <Join /> },
      { path: "/creater", element: <MyPageMain /> },
      { path: "/login", element: <LoginModal /> },
    ],
  },
]);

export default router;
