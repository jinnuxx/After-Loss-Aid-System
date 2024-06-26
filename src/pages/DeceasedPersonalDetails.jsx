import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import InputField from "../components/InputField";
import DeleteItemBtn from "../components/DeleteItemBtn";
import AddBtn from "../components/AddBtn";
import { useMediaQuery } from "@mui/material";
import theme from "../theme";
import { v4 as uuidv4 } from "uuid";
import { useStatus } from "../statusContext";

function DeceasedPersonalDetails(props) {
  const [givenNameValue, setGiveNameValue] = useState(
    sessionStorage.getItem("given-name")
  );
  const [lastNameValue, setLastNameValue] = useState(
    sessionStorage.getItem("last-name")
  );
  const [dateValue, setDateValue] = useState(
    sessionStorage.getItem("Date of Birth")
  );
  const { setStatus, getStatus } = useStatus();

  const [aliasList, setAliasList] = useState(() => {
    const storedAliases = sessionStorage.getItem("aliasList");
    return storedAliases ? JSON.parse(storedAliases) : [];
  });
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    sessionStorage.setItem("aliasList", JSON.stringify(aliasList));
    const aliasIds = aliasList.map((alias) => alias.id);
    sessionStorage.setItem("aliasIds", JSON.stringify(aliasIds));
   
  }, [aliasList]);

  const handleClick = () => {
    if (aliasList.length < 3) {
      const newAlias = {
        id: uuidv4(),
        index: aliasList.length + 1,
        value: "",
      };
      setAliasList([...aliasList, newAlias]);
    }
  };

  const handleDelete = (aliasId) => {
    sessionStorage.removeItem(`alias-${aliasId}`);

    const updatedAliases = aliasList.filter((alias) => alias.id !== aliasId);
    setAliasList(updatedAliases);
  };

  const btnUsableDetect = () => {
    let givenNameIsInput = false;
    let lastNameIsInput = false;
    let dateIsInput = false;

    if (givenNameValue == null) {
      givenNameIsInput = false;
    } else if (givenNameValue.length == 0) {
      givenNameIsInput = false;
    } else {
      givenNameIsInput = true;
    }

    if (lastNameValue == null) {
      lastNameIsInput = false;
    } else if (lastNameValue.length == 0) {
      lastNameIsInput = false;
    } else {
      lastNameIsInput = true;
    }

    if (dateValue == null) {
      dateIsInput = false;
    } else if (dateValue.length == 0) {
      dateIsInput = false;
    } else {
      dateIsInput = true;
    }

    if (givenNameIsInput && lastNameIsInput && dateIsInput == true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  btnUsableDetect();

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("given-name");
      if (relatedValue !== givenNameValue) {
        setGiveNameValue(relatedValue);
      }
    }, 100);

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [givenNameValue]); //

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("last-name");
      if (relatedValue !== lastNameValue) {
        setLastNameValue(relatedValue);
      }
    }, 100);

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [lastNameValue]); //

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("Date of Birth");
      if (relatedValue !== dateValue) {
        setDateValue(relatedValue);
      }
    }, 100);
    btnUsableDetect();

    return () => clearInterval(interval);
  }, [dateValue]); //

  return (
    <Grid container gap="18px">
      <Grid item xs={12}>
        <Typography variant="regular19">Personal Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: isLargeScreen ? "60%" : "80%" }}>
          <InputField name="given-name" labelText="Given Name" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: isLargeScreen ? "60%" : "80%" }}>
          <InputField name="middle-name" labelText="Middle Name (optional)" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: isLargeScreen ? "60%" : "80%" }}>
          <InputField name="last-name" labelText="Last Name" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="thin13" color="font.main">
          Aliases
        </Typography>
      </Grid>
      {aliasList.length > 0 && (
        <Grid item xs={12}>
          {aliasList.map((alias, index) => (
            <Box
              key={alias.id}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width: isLargeScreen ? "75%" : "100%",
                marginBottom: "18px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  mr: 1,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <InputField
                  name={`alias-${alias.id}`}
                  labelText={`Alias ${index + 1} (optional)`}
                  style={{ flexGrow: 1, marginRight: "8px" }}
                />
                <DeleteItemBtn
                  onClick={() => handleDelete(alias.id)}
                  style={{ marginTop: "50%" }}
                />
              </Box>
            </Box>
          ))}
        </Grid>
      )}

      {aliasList.length < 3 && (
        <Grid item xs={12}>
          <AddBtn onClick={handleClick} label="Add Another Alias" />
        </Grid>
      )}
      <Grid item xs={12}>
        <Box sx={{ width: isLargeScreen ? "30%" : "40%" }}>
          <InputField
            name="Date of Birth"
            type="date"
            labelText="Date of Birth"
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default DeceasedPersonalDetails;
