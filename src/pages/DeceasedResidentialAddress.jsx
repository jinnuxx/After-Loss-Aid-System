import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import AddressAutocomplete from "../components/AdressAutocomplete";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import { useStatus } from "../statusContext";
export default function DeceasedResidentialAddress() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const handleAddressSelect = ({ addressLine2, state, postcode }) => {
    setAddressLine2(addressLine2);
    setState(state);
    setPostcode(postcode);
  };
  const { setStatus, getStatus } = useStatus();

  const [addressValue, setAddressValue] = useState(
    sessionStorage.getItem("address")
  );
  const [stateValue, setStateValue] = useState(
    sessionStorage.getItem("deceasedState")
  );
  const [postcodeValue, setPostcodeValue] = useState(
    sessionStorage.getItem("deceasedPostcode")
  );

  const btnUsableDetect = () => {
    let addressIsInput = false;
    let postcodeIsInput = false;
    let stateIsInput = false;

    if (addressValue == null) {
      addressIsInput = false;
    } else if (addressValue.length == 0) {
      addressIsInput = false;
    } else {
      addressIsInput = true;
    }

    if (stateValue == null) {
      stateIsInput = false;
    } else if (stateValue.length == 0) {
      stateIsInput = false;
    } else {
      stateIsInput = true;
    }

    if (postcodeValue == null) {
      postcodeIsInput = false;
    } else if (postcodeValue.length == 0) {
      postcodeIsInput = false;
    } else {
      postcodeIsInput = true;
    }

    if (addressIsInput && stateIsInput && postcodeIsInput == true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  btnUsableDetect();

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("address");
      if (relatedValue !== addressValue) {
        setAddressValue(relatedValue);
      }
    }, 100);

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [addressValue]); 

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("deceasedState");
      if (relatedValue !== stateValue) {
        setStateValue(relatedValue);
      }
    }, 100);

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [stateValue]); 

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("deceasedPostcode");
      if (relatedValue !== postcodeValue) {
        setPostcodeValue(relatedValue);
      }
    }, 100);

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [postcodeValue]);

  return (
    <Grid container gap="18px">
      <Grid item xs={12}>
        <Typography variant="regular19">Residential Address</Typography>
      </Grid>
      <Grid item xs={12} style={{ position: "relative" }}>
        <AddressAutocomplete onAddressSelect={handleAddressSelect} />
      </Grid>
      <Grid item xs={12}>
        <InputField
          name="deceasedAddress2"
          type="text"
          labelText="Address Line 2 (optional)"
          value={addressLine2}
        />
      </Grid>
      <Grid item style={{ width: isLargeScreen ? "calc(75% - 18px)" : "100%" }}>
        <SelectField
          name="deceasedState"
          labelText="State"
          options={[
            "Australian Capital Territory",
            "New South Wales",
            "Northern Territory",
            "Queensland",
            "South Australia",
            "Tasmania",
            "Victoria",
            "Western Australia",
          ]}
          value={state}
        />
      </Grid>
      <Grid item style={{ width: isLargeScreen ? "25%" : "50%" }}>
        <InputField
          name="deceasedPostcode"
          type="post"
          labelText="Postcode"
          value={postcode}
        />
      </Grid>
    </Grid>
  );
}
