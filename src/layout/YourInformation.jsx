import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Typography, Grid, Container, Box } from "@mui/material";
import theme from "../theme";
import { useMediaQuery } from '@mui/material';
//import Footer from "../components/Footer";
function YourInformation(props) {
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  if (
    location.pathname === "/yourInformation" ||
    location.pathname === "/yourInformation/"
  ) {
    return <div>No webpage available</div>;
  }
  return (
    <Grid container width={isLargeScreen ? '533px' : '100%'}  sx={{gap: '24px',p: isLargeScreen ? '0' : '10%', }} >
      <Grid item>
        <Grid container gap="8px">
          <Grid item>
            <Typography variant="medium23" >Your Information</Typography>
          </Grid>
          <Grid item>
            <Typography variant="regular16" >
              Please share your personal details so organisations can reach out to you easily.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
}
export default YourInformation;
