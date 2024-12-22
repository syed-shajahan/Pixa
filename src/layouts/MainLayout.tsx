import React from "react";
import "../index.css";
import { Outlet } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { Box, Typography } from "@mui/material";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { LandingPageTitles } from "../utils/CommonConst";
const MainLayout = () => {
  return (
    <>
     
    <Box>
    <a href="/" className="logo_txt">
      <Typography variant="h1" textAlign={'center'} component="h1">
        {LandingPageTitles.LOGO_TITLES}
        <CollectionsOutlinedIcon className="camera" />
      </Typography>
    </a>
    <SearchForm />

    </Box>


    <Outlet />
  </>
  )
}

export default MainLayout