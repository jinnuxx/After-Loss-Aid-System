import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Box, Container, Grid } from "@mui/material";
import BackArrow from "../components/BackArrow";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import Nextstep from "../components/Nextstep";
import Footer from "../components/Footer";
function FormLayout(props) {
  const location = useLocation();
 
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid container justifyContent="center">
      <Grid item width={'100%'}>
        <Grid container gap="30px">
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            {location.pathname !== "/form/selectOrganisations" &&
              location.pathname !== "/form/downloadEmails" &&
              isLargeScreen && (
                <Box
                  sx={{
                    marginLeft: "8%",
                    marginBottom: "10px",
                  }}
                >
                  <BackArrow />
                </Box>
              )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>

    </Grid>
  );
}
export default FormLayout;
