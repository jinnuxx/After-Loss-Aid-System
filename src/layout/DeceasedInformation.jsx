import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Typography, Grid, Container, Box } from "@mui/material";
import theme from "../theme";
import { useMediaQuery } from '@mui/material';
//import Footer from "../components/Footer";
function DeceasedInformation(props) {
  const location = useLocation();
  const [title, setTitle] = useState('Deceased Information');
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    if (location.pathname === '/deceasedInformation/deceasedAdditionalInfo') {
      setTitle('Additional information');
    }
  }, [location.pathname]);

 
  if (
    location.pathname === "/deceasedInformation" ||
    location.pathname === "/deceasedInformation/"
  ) {
    return <div>No webpage available</div>;
  }
  
  return (
    <Grid container width={isLargeScreen ? '533px' : '100%'}  sx={{gap: '24px',p: isLargeScreen ? '0' : '10%', }}>
      <Grid item>
        <Grid container gap="8px">
          <Grid item>
            <Typography variant="medium23" >{title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="regular16" >
              To locate any accounts the individual held with the selected
              organisations, please provide the information below.
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
export default DeceasedInformation;
