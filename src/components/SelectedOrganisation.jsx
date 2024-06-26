import React from "react";
import { Grid, Typography } from "@mui/material";
import DownloadBtn from "../components/DownloadBtn";
import SignBtn from "../components/SignBtn";

const SelectedOrganisation = ({ obj, onClick }) => {
  return (
    <Grid container gap="12px">
      {Object.values(obj).map((val, index) => (
        <Grid item key={index} xs={12}>
          <Grid container justifyContent="space-between"  width="100%">
            <Grid item width="60%">
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#EFEFEF",
                  },
                }}
              >
                <Grid item>
                  <img
                    src={val.logo}
                    alt={val.name}
                    style={{ width: 24, height: 24, margin: 10 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="regular16">{val.name}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <SignBtn
                onClick={() => {
                  onClick(val.name, 0);
                  window.location.href = "http://localhost:3000/form/sign";
                }}
              />
              <DownloadBtn onClick={() => onClick(val.name, 1)} />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectedOrganisation;
