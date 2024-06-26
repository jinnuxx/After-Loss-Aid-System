import { Grid, Typography, Divider } from "@mui/material";
import React from "react";
import SelectedOrganisationList from "../components/SelectedOrganisationList";
import { useOrganisations } from "../OrganisationsContext";

import generatePdf from "../components/PdfGeneator";
import CustomButton from "../components/CustomBtn";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";


export default function DownloadEmails({selectedOrganisations}) {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  async function handleClick(organizationName, state) {
    await generatePdf(organizationName, state);

  }

  const downloadAllEmails = async () => {
    for (const name of selectedOrganisations) {
      await generatePdf(name.name, 1);
    }
  };

  return (
    <Grid
      container
      width={isLargeScreen ? "522px" : "100%"}
      sx={{ padding: isLargeScreen ? "0" : "10%" }}
      gap="48px"
    >
      <Grid item xs={12}>
        <Typography variant="medium23">Download Notification Emails</Typography>
      </Grid>
      <Grid item xs={12}>
        <SelectedOrganisationList onClick={handleClick} />
      </Grid>
    </Grid>
  );
}
