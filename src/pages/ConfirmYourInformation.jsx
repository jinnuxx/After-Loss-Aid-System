import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import CustomButton from "../components/CustomBtn";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";

export default function YourPersonalDetails() {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [yourInfo, setYourInfo] = useState({
    givenName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    officialRole: "",
    typeOfRole: "",
  });

  useEffect(() => {
    const givenName = sessionStorage.getItem("userGivenName") || "";
    const lastName = sessionStorage.getItem("userLastName") || "";
    const emailAddress = sessionStorage.getItem("userEmail") || "";
    const phoneNumber = sessionStorage.getItem("userPhone") || "";
    const officialRole = sessionStorage.getItem("officialRole") || "";
    const typeOfRole = sessionStorage.getItem("typeOfRole") || "";

    setYourInfo({
      givenName,
      lastName,
      emailAddress,
      phoneNumber,
      officialRole,
      typeOfRole,
    });
  }, []);

  return (
    <Box>
      <Grid
        container
        direction="column"
        width={isLargeScreen ? "1152px" : "100%"}
      >
        <Grid item width={"100%"}>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{paddingBottom:'30px'}}>
              <Link to="/form/yourInformation/yourPersonalDetails">
                <CustomButton themePalette="secondary" customWidth="204px">
                  Edit Your Information
                </CustomButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container gap="48px" direction="column">
            <Grid item>
              <Grid container gap="24px" direction="column">
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Personal Information
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Given Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="thin13"
                            color="font.main"
                            align="left"
                          >
                            {yourInfo.givenName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Last Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {yourInfo.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container gap="24px" direction="column">
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Contact Information
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid container direction="row" alignItems="flex-start">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Email Address
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {yourInfo.emailAddress}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="flex-start">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Phone Number
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {yourInfo.phoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container gap="24px" direction="column">
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Role
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Official Role
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {yourInfo.officialRole}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center">
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Type of Role
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {yourInfo.typeOfRole}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
