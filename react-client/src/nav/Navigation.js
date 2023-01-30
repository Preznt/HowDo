import { createBrowserRouter } from "react-router-dom";
import AppSample from "../AppSample";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import LoginModal from "../comp/login/Login";
import CommuMain from "../comp/community/CommuMain";
import CommuCat from "../comp/community/CommuCat";
import CommuDetail from "../comp/community/CommuDetail";
import CommuWrite from "../comp/community/CommuWrite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/user", element: <Join /> },
      { path: "/user/login", element: <Login /> },
      { path: "/mypage", element: <MyPageMain /> },
      { path: "/login", element: <LoginModal /> },
      { path: "/community", element: <CommuMain /> },
      { path: "/community/:cat", element: <CommuCat /> },
      { path: "/community/:cat/:board", element: <CommuDetail /> },
      { path: "/community/write/:board?", element: <CommuWrite /> },
    ],
  },
]);

export default router;
