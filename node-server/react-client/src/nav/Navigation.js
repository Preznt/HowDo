import { createBrowserRouter } from "react-router-dom";
import AppSample from "../App";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import LoginModal from "../comp/login/Login";
import CommMain from "../comp/community/CommMain";

import CommIndex, { loader as CommLoader } from "../comp/community/CommIndex";

import Board, { loader as BoardLoader } from "../comp/community/Board";
import PostDetail, {
  loader as DetailLoader,
} from "../comp/community/PostDetail";
import PostWrite from "../comp/community/PostWrite";
import Approve from "../comp/purchase/Approve";
import SearchMain from "../comp/serachPage/SearchMain";

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
      {
        path: "/community",
        loader: CommLoader,
        element: <CommIndex />,
        children: [
          { path: "", element: <CommMain /> },
          {
            path: ":board",
            loader: BoardLoader,
            element: <Board />,
          },
          {
            path: ":board/:post",
            loader: DetailLoader,
            element: <PostDetail />,
          },
          { path: ":board/write/:post?", element: <PostWrite /> },
        ],
      },
      { path: "/approval", element: <Approve /> },
      { path: "/search", element: <SearchMain /> },
    ],
  },
]);

export default router;
