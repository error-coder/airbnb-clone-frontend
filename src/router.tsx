import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "rooms/upload", element: <UploadRoom /> },
      { path: "rooms/:roomId", element: <RoomDetail /> },
      { path: "rooms/:roomId/photos", element: <UploadPhotos /> },
      {
        path: "social",
        children: [
          { path: "github", element: <GithubConfirm /> },
          { path: "kakao", element: <KakaoConfirm /> },
        ],
      },
    ],
  },
]);

export default router;