import React from "react";
import "../index.css";
import { Outlet } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { Box, Typography } from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { LandingPageTitles } from "../utils/CommonConst";
import { IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { PageProvider } from "../utils/contextapi/PageContext";

const MainLayout = () => {
  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Box>
        <a href="/" className="logo_txt">
          <Typography variant="h1" textAlign={"center"} marginTop={'20px'} component="h1">
            {LandingPageTitles.LOGO_TITLES}
            <CollectionsOutlinedIcon className="camera" />
          </Typography>
        </a>
        <SearchForm />
      </Box>

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
