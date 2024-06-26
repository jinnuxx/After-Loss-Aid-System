import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Typography, Grid, Tab, Tabs, styled } from "@mui/material";
import { Link } from 'react-router-dom';
import theme from "../theme";
import { useMediaQuery } from '@mui/material';
import { AccountBalance, Feed, PermIdentity } from "@mui/icons-material";

//import Footer from "../components/Footer";
function ConfirmAndNotidy(props) {
  const location = useLocation();
  const [value, setValue] = useState('0');
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const StyledTab = styled(Tab)(({ theme }) => ({
    ...theme.typography.regular16,
    color: 'black',
    textTransform: 'none',
    padding: '0',
    marginRight: isLargeScreen? '7%':'0',
    '&.Mui-selected': {
      ...theme.typography.bold16,
      color: 'black',
      borderBottom: `2px solid black`,
    },
  }));

  if (
    location.pathname === "/confirm&notify" ||
    location.pathname === "/confirm&notify/"
  ) {
    return <div >No webpage available</div>;
  }
  return (
    <Grid container width={isLargeScreen ? '1152px' : '100%'} gap="24px" sx={{ padding: isLargeScreen ? '0' : '5%' }}>
      <Grid item xs={12}>
        <Grid container gap="8px">
          <Grid item xs={12}>
            <Typography variant="medium23" >Confirm and Notify</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="regular16" >
              The details below will be sent to the selected organisations.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {isLargeScreen ? (
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            indicatorColor="font"
          >
            <StyledTab
              value='0'
              component={Link}
              to="./confirmSelectedOrganisations"
              label="Selected Organisations"
              wrapped
            />
            <StyledTab
              value='1'
              component={Link}
              to="./confirmDeceasedInformation"
              label="Deceased Information"
              wrapped
            />
            <StyledTab
              value='2'
              component={Link}
              to="./confirmYourInformation"
              label="Your Information"
              wrapped
            />
          </Tabs>
        ) : (
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            indicatorColor="font"
            centered
          >
            <StyledTab
              value='0'
              component={Link}
              to="./confirmSelectedOrganisations"
              icon={<AccountBalance />}
              
            />
            <StyledTab
              value='1'
              component={Link}
              to="./confirmDeceasedInformation"
              icon={<PermIdentity />}
            />
            <StyledTab
              value='2'
              component={Link}
              to="./confirmYourInformation"
              icon={<Feed />}
            />
          </Tabs>
        )}

      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
}
export default ConfirmAndNotidy;
