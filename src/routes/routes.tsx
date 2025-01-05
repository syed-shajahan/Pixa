import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/search-page";
import Home from "../pages/home";
import MainLayout from "../layouts/MainLayout";
import TestLayout from "../layouts/TestLayout";
import LikesPage from "../pages/likes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path:'likePost',
        element:<LikesPage />
      }
    ],
  },

  {
    path: "/test-layout",
    element: <TestLayout />,

    children: [
      {
        path: "/test-layout/search",
        element: '',
      },
    ],
  },
]);

export default routes;
