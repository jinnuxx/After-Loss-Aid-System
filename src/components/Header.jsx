import React from "react";
import { Box, Grid } from "@mui/material";
import Stepper from "./Stepper";
import ExitBtn from "./ExitBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrganisations } from "../OrganisationsContext";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearOrganisations } = useOrganisations();

  function backToHome() {
    console.log("BackToHome");
    navigate("/form/selectOrganisations");
  }

  function handleClick() {
    sessionStorage.clear();
    clearOrganisations();
    navigate("/");
  }

  return (
    <Grid
      container
      gap="12px"
      sx={{
        width: "90%",
        margin: "5% 0",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <img
              src="/Logo.svg"
              alt="Logo"
              width="24"
              height="23"
              onClick={backToHome}
            />
          </Grid>
          <Grid item>
            <ExitBtn handleClick={handleClick} />
          </Grid>
        </Grid>
      </Grid>
      {!location.pathname.includes("/downloadEmails") &&
        !location.pathname.includes("/sign") && (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Stepper />
          <div style={{ height: '80px' }}></div>
        </Grid>
      ) }
    </Grid>
  );
}

export default Header;
