import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/search-page";
import Home from "../pages/home";
import MainLayout from "../layouts/MainLayout";
import TestLayout from "../layouts/Minimalayout";
import LikesPage from "../pages/likes";
import Signup from "../pages/registration/SignUp";
import SamplePage from "../pages/SamplePage";
import Login from "../pages/registration/Login";
import ProtectedRoutes from "./protected-routes/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/sample",
    element: <SamplePage />,
  },

  {
    element: <ProtectedRoutes />,
    children: [
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
            path: "likePost",
            element: <LikesPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/test-layout",
    element: <TestLayout />,

    children: [],
  },
]);

export default routes;
