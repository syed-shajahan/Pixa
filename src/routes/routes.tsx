import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import Home from "../pages/Home";
// import App from "../App";
import MainLayout from "../layouts/MainLayout";

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
    ],
  },
]);

export default routes;
