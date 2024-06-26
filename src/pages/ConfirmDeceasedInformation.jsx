import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import CustomButton from "../components/CustomBtn";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import { getFileFromIndexedDB } from "../components/filePrew";

export default function ConfirmDeceasedInformation() {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [deceasedInfo, setDeceasedInfo] = useState({
    givenName: "",
    middleName: "",
    lastName: "",
    dob: "",
    aliases: [],
    emailAddress: [],
    phoneNumber: [],
    address: "",
    address2: "",
    state: "",
    postcode: "",
    location: "",
    dod: "",
    fileName: "",
  });
  console.log(isLargeScreen)


  useEffect(() => {
    const givenName = sessionStorage.getItem("given-name") || "";
    const middleName = sessionStorage.getItem("middle-name") || "";
    const lastName = sessionStorage.getItem("last-name") || "";
    const dob = sessionStorage.getItem("Date of Birth") || "";

    const aliasIds = JSON.parse(sessionStorage.getItem("aliasIds")) || [];
    const aliases = aliasIds
      .map((id) => sessionStorage.getItem(`alias-${id}`))
      .filter((item) => item !== null);
    const emailAddress = [0, 1, 2, 3]
      .map((index) => sessionStorage.getItem(`Email Address-${index}`))
      .filter((item) => item !== null);
    const phoneNumber = [0, 1, 2]
      .map((index) => sessionStorage.getItem(`Phone Number-${index}`))
      .filter((item) => item !== null);
    const address = sessionStorage.getItem("address") || "";
    const address2 = sessionStorage.getItem("deceasedAddress2") || "";
    const state = sessionStorage.getItem("deceasedState") || "";
    const postcode = sessionStorage.getItem("deceasedPostcode") || "";
    const location = sessionStorage.getItem("location") || "";
    const dod = sessionStorage.getItem("Date of Death") || "";
    const fileName = sessionStorage.getItem("UploadedFileName") || "";

    setDeceasedInfo({
      givenName,
      middleName,
      lastName,
      dob,
      aliases,
      emailAddress,
      phoneNumber,
      address,
      address2,
      state,
      postcode,
      location,
      dod,
      fileName,
    });
  }, []);



  return (
    <Box>
      <Grid container direction="column" width={isLargeScreen ? '1152px' : '100%'} >
        <Grid item>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{paddingBottom:'30px'}}>
              <Link to="/form/deceasedInformation/deceasedPersonalDetails">
                <CustomButton themePalette="secondary" customWidth="246px">
                  Edit Deceased Information
                </CustomButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* All Information Details */}
        <Grid item>
          <Grid container gap="48px" direction="column">
            {/* Each part of information */}
            {/* Personal Information */}
            <Grid item>
              <Grid container gap="24px" direction="column">
                {/* Personal Info */}
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Personal Information
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Given Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container justifyContent="center">
                            <Grid item>
                              <Typography variant="thin13" color="font.main">
                                {deceasedInfo.givenName}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Middle Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.middleName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Last Name
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Aliases
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="thin13" color="font.main">
                                {deceasedInfo.aliases[0]}
                              </Typography>
                            </Grid>
                            {deceasedInfo.aliases.length > 1 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.aliases[1]}
                                </Typography>
                              </Grid>
                            )}
                            {deceasedInfo.aliases.length > 2 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.aliases[2]}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item style={{ width: isLargeScreen ? '300px' : '50%' }}>
                          <Typography variant="thin13" color="font.main">

                            Date of Birth
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.dob}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Contact Information        */}
            <Grid item>
              <Grid container gap="24px" direction="column">
                {/* Personal Info */}
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Contact Information
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Email Address
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.emailAddress[0]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Alternative Email Address
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            {deceasedInfo.emailAddress.length > 1 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.emailAddress[1]}
                                </Typography>
                              </Grid>
                            )}
                            {deceasedInfo.emailAddress.length > 2 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.emailAddress[2]}
                                </Typography>
                              </Grid>
                            )}
                            {deceasedInfo.emailAddress.length > 3 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.emailAddress[3]}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
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
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="thin13" color="font.main">
                                {" "}
                                {deceasedInfo.phoneNumber[0]}
                              </Typography>
                            </Grid>
                            {deceasedInfo.phoneNumber.length > 1 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.phoneNumber[1]}
                                </Typography>
                              </Grid>
                            )}
                            {deceasedInfo.phoneNumber.length > 2 && (
                              <Grid item>
                                <Typography variant="thin13" color="font.main">
                                  {deceasedInfo.phoneNumber[2]}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Residential Address */}
            <Grid item>
              <Grid container gap="24px" direction="column">
                {/* Personal Info */}
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Residential Address
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            Address Line 1
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {" "}
                            {deceasedInfo.address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item style={{ width: isLargeScreen ? '300px' : '50%' }}>
                          <Typography variant="thin13" color="font.main">

                            Address Line 2
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.address2}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item style={{ width: isLargeScreen ? '300px' : '50%' }}>
                          <Typography variant="thin13" color="font.main">

                            State
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.state}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Postcode
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.postcode}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Important Details */}
            <Grid item>
              <Grid container gap="24px" direction="column">
                {/* Personal Info */}
                <Grid item>
                  <Typography variant="bold16" color="font.main">
                    Important Details
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container gap="18px" direction="column">
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item style={{ width: isLargeScreen ? '300px' : '50%' }}>
                          <Typography variant="thin13" color="font.main">

                            Location of Death
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.location}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item style={{ width: isLargeScreen ? '300px' : '50%' }}>
                          <Typography variant="thin13" color="font.main">

                            Date of Death
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="thin13" color="font.main">
                            {deceasedInfo.dod}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ width: isLargeScreen ? "300px" : "50%" }}
                        >
                          <Typography variant="thin13" color="font.main">
                            Death Certificate
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="thin13"
                            color="font.special"
                            onClick={getFileFromIndexedDB}
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            {deceasedInfo.fileName}
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
