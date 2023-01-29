import { createBrowserRouter } from "react-router-dom";
import AppSample from "../App";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import Approve from "../comp/purchase/Approve";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/user", element: <Join /> },
      { path: "/user/login", element: <Login /> },
      { path: "/mypage", element: <MyPageMain /> },
      { path: "/approval", element: <Approve /> },
    ],
  },
]);

export default router;
