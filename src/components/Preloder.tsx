// Preloader.js
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Preloader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position:'fixed',
        left:'0px',
        width:'100%',
        top:'0px',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Preloader;
