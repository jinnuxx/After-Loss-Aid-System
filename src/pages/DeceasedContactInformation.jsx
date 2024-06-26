import React, { useState, useEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import DeleteItemBtn from "../components/DeleteItemBtn";
import { useLocation } from "react-router-dom";

import InputField from "../components/InputField";

import { useMediaQuery } from "@mui/material";
import theme from "../theme";

import Typography from "@mui/material/Typography";
import AddBtn from "../components/AddBtn";

import { useStatus } from "../statusContext";

function DeceasedContactInformation(props) {
  const location = useLocation();
  const visited = location.state?.visited;

  useEffect(() => {
    if (visited) {
      console.log("This page has been visited before.");
    } else {
      console.log("This page has not been visited before.");
    }
  }, [visited]);

  const { setStatus, getStatus } = useStatus();
  setStatus(true);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [numOfEmails, setNumOfEmails] = useState(1);
  const [numOfPhones, setNumOfPhones] = useState(1);
  const handleAdd = (type) => {
    if (type == "email") {
      if (numOfEmails <= 3) {
        setNumOfEmails(numOfEmails + 1);
      }
    } else {
      if (numOfPhones <= 3) {
        setNumOfPhones(numOfPhones + 1);
      }
    }
  };
  const handleDelete = (type) => {
    console.log(type);
    if (type == "email") {
      if (numOfEmails >= 1) {
        setNumOfEmails(numOfEmails - 1);
      }
    } else {
      if (numOfPhones >= 1) {
        setNumOfPhones(numOfPhones - 1);
      }
    }
  };

  return (
    <Grid container gap="18px">
      <Grid item xs={12} style={{ marginBottom: "-10px" }}>
        <Typography variant="regular19">Contact Information</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container gap="32px">
          <Grid item xs={12}>
            <Grid container direction="column" gap="12px">
              <Grid item xs={12}>
                {Array.from({ length: numOfEmails }).map((emails, index) => (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    key={index}
                  >
                    <Box sx={{ width: isLargeScreen ? "60%" : "80%" }}>
                      <InputField
                        name={`Email Address-${index}`}
                        type="email"
                        labelText="Email Address (optional)"
                      />
                    </Box>

                    {index !== 0 && (
                      <DeleteItemBtn onClick={() => handleDelete("email")} />
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <AddBtn
                  label="Add Another Email Adress"
                  onClick={() => handleAdd("email")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              gap="12px"
              direction="column"
              style={{ marginTop: "-10px" }}
            >
              <Grid item>
                {Array.from({ length: numOfPhones }).map((phones, index) => (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    key={index}
                  >
                    <Box sx={{ width: isLargeScreen ? "60%" : "80%" }}>
                      <InputField
                        name={`Phone Number-${index}`}
                        type="tel"
                        labelText="Phone Number (optional)"
                      />
                    </Box>

                    {index !== 0 && (
                      <DeleteItemBtn onClick={() => handleDelete("phone")} />
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <AddBtn
                  label="Add Another Phone Number"
                  onClick={() => handleAdd("phone")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*<Nextstep nextPage={nextPage} />*/}
    </Grid>
  );
}

export default DeceasedContactInformation;
