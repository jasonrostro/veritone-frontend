import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: "#4D81B7" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Dosis, sans-serif", fontSize: 18 }}
        >
          SHOPPING LIST
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
