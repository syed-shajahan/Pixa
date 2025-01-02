import "../index.css";
import { Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { PageProvider } from "../utils/contextapi/PageContext";
import Header from "../components/Header";

const MainLayout = () => {
  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <IconButton className="toTopBtn" onClick={handlePageUp}>
        <ArrowUpwardIcon />
      </IconButton>

      <PageProvider>
        <Outlet />
      </PageProvider>
    </>
  );
};

export default MainLayout;
