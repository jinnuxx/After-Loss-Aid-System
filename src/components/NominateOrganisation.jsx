import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import UniversalLogo from "../images/Universal.png";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import CustomButton from "./CustomBtn";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ExitBtn from "./ExitBtn";
import AddBtn from "./AddBtn";
const OrganisationTypes = [
  'Banks', 'Superannuation', 'Insurance', 'Shares', 'Telecommunications and Internet Services', 'Electricity and Gas', 'Water', 'Social Media', 'Subscription'
]

function NominateOrganisation({ onAdd, isOpenCheck }) {
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    const organisationName = sessionStorage.getItem('organisationName1');
    const organisationType = sessionStorage.getItem('organisationType1');
    if (organisationName && organisationType) {
      const newOrganisation = {
        name: organisationName,
        logo: UniversalLogo,
        category: organisationType,
      };
      const newOrganisationObj = JSON.parse(JSON.stringify(newOrganisation));
      onAdd(organisationType, newOrganisationObj);
      sessionStorage.removeItem('organisationName1');
      sessionStorage.removeItem('organisationType1');
      setOpen(false);
      isOpenCheck(false)
    }
  }
  useEffect(() => {
    console.log(open)
    if (open) {
      const timer = setTimeout(() => {
        console.log("1123" + open)

        isOpenCheck(open)
      }, 300);

      return () => clearTimeout(timer);

    }

  }, [open])

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <AddBtn onClick={(e) => setOpen(true)} label="Nominate an organisation" />
      <Modal open={open}>
        <Box sx={{padding: isLargeScreen ?'30px 60px' :'10px 20px', width: isLargeScreen ? "503px" : "100%",  bgcolor: "background.default", borderRadius: isLargeScreen ?'30px':'10px' }}>
          <Grid container gap="12px">
            <Grid
              item
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ExitBtn handleClick={() => isOpenCheck(false)} />
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <Grid container gap="32px">
                <Grid item sx={{ width: "100%" }}>
                  <Typography variant="bold23" color="font.main">
                    Nominate an organisation
                  </Typography>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Grid container gap="18px">
                    <Grid item sx={{ width: "100%" }}>
                      <InputField
                        name="organisationName1"
                        type="text"
                        labelText="Organisation Name"
                      />
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <SelectField
                        name="organisationType1"
                        labelText="Type of Organisation"
                        placeholder="Select the type of organisation"
                        options={OrganisationTypes}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <Grid container justifyContent="space-between" >
                    <Grid item >
                      <CustomButton
                        themePalette="secondary"
                        customWidth={isLargeScreen ? undefined : '150px'}
                        onClick={(e) => isOpenCheck(false)}
                      >
                        Cancel
                      </CustomButton>
                    </Grid>
                    <Grid item >
                      <CustomButton themePalette="primary" onClick={handleAdd}  customWidth={isLargeScreen ? undefined : '150px'}>
                        Add
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default NominateOrganisation;
