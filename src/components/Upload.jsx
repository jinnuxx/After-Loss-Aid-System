import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  LinearProgress,
  IconButton,
  Grid,
} from "@mui/material";
import ExitBtn from "./ExitBtn";
import Narrow from "../images/Narrow.png";
import Tick from "../images/Tick.png";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomBtn";
import theme from "../theme";
import { useStatus } from "../statusContext";
import { useMediaQuery } from "@mui/material";
const LinearProgressWithGradient = ({ value }) => (
  <LinearProgress
    variant="determinate"
    value={value}
    sx={{
      width: "100%",
      height: "4px",
      borderRadius: "40px",
      backgroundColor: "#EFEFEF",
      "& .MuiLinearProgress-bar": {
        backgroundImage:
          value > 0
            ? "linear-gradient(90deg, #C4F0A9 0%, #58CC02 62.48%, #58A700 83.87%)"
            : "none",
        backgroundColor: value > 0 ? "transparent" : "#EFEFEF",
      },
    }}
  />
);

export default function Upload({ onUpload }) {
  const [open, setOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const inputFileRef = useRef(null);
  const [showIcon, setShowIcon] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUploadProgress(0);
  };

  const confirmUpload = () => {
    if (uploadProgress === 100) {
      console.log(fileName);
      onUpload(fileName);
      handleClose();
    }
  };


  const storeFileInIndexedDB = (fileContent, file) => {
    const request = window.indexedDB.open("filesDB", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "fileName" });
        console.log("Object store 'files' created");
      } else {
        console.log("Object store 'files' already exists");
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("Database opened successfully");

      if (db.objectStoreNames.contains("files")) {
        try {
          const transaction = db.transaction("files", "readwrite");
          const store = transaction.objectStore("files");
          const addRequest = store.add({ fileName: file.name, content: fileContent });

          addRequest.onsuccess = () => {
            console.log("File stored in IndexedDB");
          };

          addRequest.onerror = (event) => {
            console.error("Error storing file:", event);
          };

          transaction.oncomplete = () => {
            console.log("Transaction completed successfully");
          };

          transaction.onerror = (event) => {
            console.error("Transaction error:", event);
          };
        } catch (error) {
          console.error("Error during transaction:", error);
        }
      } else {
        console.error("Object store 'files' not found");
      }
    };

    request.onerror = (event) => {
      console.error("Error opening database:", event);
    };
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setFileName(file.name);
        sessionStorage.setItem("UploadedFileName", file.name);
        let progress = 0;
        const uploadInterval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(uploadInterval);
            setUploadProgress(100);
            setShowIcon(true);
          } else {
            setUploadProgress(progress);
          }
        }, 100);
        reader.onloadend = () => {
          storeFileInIndexedDB(fileContent, file);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const clearIndexedDB = () => {
    const request = window.indexedDB.open("filesDB", 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      const clearRequest = store.clear();
      sessionStorage.removeItem("UploadedFileName");

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


  const handleCancel = () => {
    clearIndexedDB();
    handleClose();
  };

  const handleRemoveFile = () => {
    setFileName("");
    setUploadProgress(0);
    clearIndexedDB();
  };

  return (
    <div>
      <CustomButton themePalette="secondary" onClick={handleOpen}>
        Upload
      </CustomButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: isLargeScreen ? "795px" : "100%",
            padding: isLargeScreen ? "30px 50px" : "10px 30px",
            gap: "12px",
            borderRadius: isLargeScreen ? "30px" : "10px",
            bgcolor: "background.default",
          }}
        >
          <Grid container gap="12px">
            <Grid
              item
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ExitBtn handleClick={() => setOpen(false)} />
            </Grid>
            <Grid item>
              <Grid container width="100%" gap="32px">
                <Grid item width="100%">
                  <Typography variant="bold23">
                    Upload Death Certificate
                  </Typography>
                </Grid>
                <Grid item gap="24px" width="100%">
                  <Grid container width="100%" gap="12px">
                    <Grid
                      item
                      sx={{
                        width: "100%",
                        padding: "30px 0",
                        borderRadius: "8px",
                        border: "1px solid #DADADA",
                        bgcolor: "background.main",
                      }}
                    >
                      <Grid container width="100%">
                        <Grid
                          item
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={Narrow}
                            alt="Narrow"
                            style={{ width: "12px", height: "16px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="regular16">
                            Drag file here or click to
                            <input
                              type="file"
                              ref={inputFileRef}
                              style={{ display: "none" }}
                              onChange={handleFileUpload}
                            />
                            <Button
                              variant="text"
                              sx={{
                                ...theme.typography.regular16,
                                textAlign: "center",
                                color: theme.palette.font.main,
                                textDecoration: "underline",
                                textTransform: "lowercase",
                              }}
                              onClick={() => inputFileRef.current.click()}
                            >
                              browse
                            </Button>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="regular13"
                            style={{ color: theme.palette.font.light }}
                          >
                            Accepted file types: PDF, PNG, JPEG
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item width="100%">
                      {fileName && (
                        <Grid
                          container
                          sx={{
                            width: "100%",
                            padding: "12px",
                            gap: "2px",
                            borderRadius: "8px",
                            border: "1px solid #DADADA",
                            bgcolor: "background.main",
                          }}
                        >
                          <Grid
                            item
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              marginBottom: "2px",
                            }}
                          >
                            <IconButton
                              onClick={handleRemoveFile}
                              style={{ minWidth: "12px", minHeight: "12px" }}
                            >
                              <CloseIcon style={{ fontSize: "12px" }} />
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            {uploadProgress === 100 && (
                              <img
                                src={Tick}
                                alt="Tick"
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  marginRight: "4px",
                                }}
                              />
                            )}
                            <Typography variant="regular13">
                              {fileName}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ width: "95%", paddingTop: "12px" }}>
                              <LinearProgressWithGradient
                                value={uploadProgress}
                              />
                            </Box>
                            <Typography variant="regular13">{`${Math.round(uploadProgress)}%`}</Typography>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    width="100%"
                    gap="13px"
                    justifyContent={
                      isLargeScreen ? "flex-end" : "space-between"
                    }
                  >
                    <CustomButton
                      themePalette="secondary"
                      onClick={(event) => {
                        handleCancel(event);
                        handleRemoveFile(event);
                      }}
                      customWidth={isLargeScreen ? undefined : "150px"}
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton
                      themePalette="primary"
                      onClick={confirmUpload}
                      customWidth={isLargeScreen ? undefined : "150px"}
                      disabled={uploadProgress < 100}
                    >
                      Upload
                    </CustomButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
