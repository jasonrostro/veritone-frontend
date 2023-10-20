import React from "react";
import { Box } from "@mui/material";
import Header from "../Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box mt={4}>{children}</Box>
    </>
  );
};

export default MainLayout;
