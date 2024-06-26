import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import Upload from "../components/Upload";

import { useOrganisations } from "../OrganisationsContext";
import { useMediaQuery } from "@mui/material";
import theme from "../theme";
import { useStatus } from "../statusContext";

import DeleteItemBtn from "../components/DeleteItemBtn";
import Tick from "../images/Tick.png";

import { getFileFromIndexedDB } from "../components/filePrew";


export let shareholdingsSelected = false;

export default function DeceasedImportantDetails() {
  const [location, setLocation] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [showListItem, setShowListItem] = useState(
    () => sessionStorage.getItem("showListItem") === "true"
  );
  const [fileName, setFileName] = useState(
    () => sessionStorage.getItem("fileName") || null
  );
  const [locationValue, setLocationValue] = useState(
    sessionStorage.getItem("location")
  );
  const [deadDayValue, setDeadDayValue] = useState(
    sessionStorage.getItem("Date of Death")
  );

  const { setStatus, getStatus } = useStatus();

  const btnUsableDetect = () => {
    let locationIsInput = false;
    let deadDayIsInput = false;

    if (locationValue == null) {
      locationIsInput = false;
    } else if (locationValue.length == 0) {
      locationIsInput = false;
    } else {
      locationIsInput = true;
    }

    if (deadDayValue == null) {
      deadDayIsInput = false;
    } else if (deadDayValue.length == 0) {
      deadDayIsInput = false;
    } else {
      deadDayIsInput = true;
    }

    if (locationIsInput && deadDayIsInput == true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const clearIndexedDB = () => {
    const request = window.indexedDB.open("filesDB", 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      const clearRequest = store.clear();
      sessionStorage.removeItem("UploadedFileName")

      clearRequest.onsuccess = () => {
        console.log("IndexedDB cleared");
      };

      clearRequest.onerror = (event) => {
        console.error("Error clearing IndexedDB:", event);
      };
    };

    request.onerror = (event) => {
      console.error("Error opening database:", event);
    };
  };

  btnUsableDetect();

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("location");
      if (relatedValue !== locationValue) {
        setLocationValue(relatedValue);
      }
    }, 100); 

    btnUsableDetect();

    return () => clearInterval(interval); 
  }, [locationValue]); 

  useEffect(() => {
    const interval = setInterval(() => {
      const relatedValue = sessionStorage.getItem("Date of Death");
      if (relatedValue !== deadDayValue) {
        setDeadDayValue(relatedValue);
      }
    }, 100); 

    btnUsableDetect();

    return () => clearInterval(interval);
  }, [deadDayValue]);

  const { selectedOrganisations } = useOrganisations();

  selectedOrganisations.some((org) => org.category === "Shares")
    ? (shareholdingsSelected = true)
    : (shareholdingsSelected = false);

  useEffect(() => {
    sessionStorage.setItem("showListItem", showListItem);
    sessionStorage.setItem("fileName", fileName);
  }, [showListItem, fileName]);



  const onFileUpload = (uploadedFileName) => {
    setFileName(uploadedFileName);
    setShowListItem(true);
  };

  const ListItem = ({ fileName, onDelete }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDeleteClick = () => {
      setIsVisible(false);
      onDelete(fileName);
      clearIndexedDB();
    };

    return isVisible ? (
      <Grid
        container
        justifyContent="flex-start"
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <img
            src={Tick}
            alt="Tick"
            style={{ width: "14px", height: "14px" }}
          />
        </Grid>
        <Grid item>
          <Typography 
            sx={{ flexGrow: 1, marginLeft: "10px"}}
            color="font.special"
            onClick={getFileFromIndexedDB}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {fileName}
          </Typography>
        </Grid>
        <Grid item>
          <DeleteItemBtn onClick={handleDeleteClick} />
        </Grid>
      </Grid>
    ) : null;
  };

  return (
    <Grid container gap={"18px"}>
      <Grid item xs={12}>
        <Typography variant="regular19">Important Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: isLargeScreen ? "60%" : "100%" }}>
          <SelectField
            name="location"
            labelText="In which location did this individual pass way?"
            options={[
              "New South Wales",
              "Queensland",
              "South Australia",
              "Tasmania",
              "Victoria",
              "Western Australia",
            ]}
            value={location}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            width: isLargeScreen ? "30%" : "40%",
          }}
        >
          <InputField
            name="Date of Death"
            type="date"
            labelText="Date of Death"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "30px" }}>
        <Grid item xs={12}>
          <Typography variant="regular19">Death Certificate</Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "20px" }}>
          <Box display="flex">
            <Typography variant="regular14">
              Upload Death Certificate
            </Typography>
            <Typography
              variant="regular14"
              color={"textSecondary"}
              sx={{ marginLeft: "5px" }}
            >
              (optional)
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ marginTop: "10px" }}
          style={{ display: "flex", alignItems: "center" }}
        >
          {showListItem && (
            <ListItem
              fileName={fileName}
              onDelete={() => setShowListItem(false)}
            />
          )}
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Upload onUpload={onFileUpload} />
        </Grid>
       
      </Grid>
    </Grid>
  );
}
