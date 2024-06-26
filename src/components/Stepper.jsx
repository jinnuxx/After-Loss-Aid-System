import React, { useState, useEffect } from "react";
import { Box, Slider, StepLabel } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";

export default function Stepper() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const sections = [
    {
      label: "Select Organisations",
      path: "selectOrganisations",
      visited: sessionStorage.getItem("visitedSelectOrganisations") === "true",
    },
    {
      label: "Deceased Information",
      path: "deceasedInformation/deceasedPersonalDetails",
      visited:sessionStorage.getItem("visitedDeceasedInformation") === "true",
    },
    {
      label: "Your Information",
      path: "yourInformation/yourPersonalDetails",
      visited: sessionStorage.getItem("visitedYourInformation") === "true",
    },
    {
      label: "Confirm and Notify",
      path: "confirm&notify/confirmSelectedOrganisations",
      visited: sessionStorage.getItem("confirm&notify") === "true",
    },
  ];

  useEffect(() => {
    const newPath = location.pathname;
    sections.forEach((section) => {
      if (newPath.includes(section.path.split("/")[0])) {
        if (section.path.split("/")[0] === "confirm&notify") {
          sessionStorage.setItem("confirm&notify", "true");
          section.visited = true;
        }
    
        else {
          sessionStorage.setItem(
            `visited${section.label.replace(/\s+/g, "")}`,
            "true"
          );
          section.visited = true;
        }
      }
    });
    const newIndex = sections.findIndex((section) =>
      newPath.includes(section.path.split("/")[0])
    );
    setValue(newIndex >= 0 ? newIndex : 0);
  }, [location.pathname]);

  const navigateTo = (index) => {
    navigate("../form/" + sections[index].path);
  };

  const getLabelStyle = (index) => ({
    fontSize: "13px",
    fontWeight: index === value || sections[index].visited ? "500" : "400",
    lineHeight: "15.6px",
    textAlign: "left",
    color: index <= value || sections[index].visited ? "#1D1D1D" : "#969696",
    padding: "3px",
    cursor: index <= value || sections[index].visited ? "pointer" : "default",
  });

  return (
    <Box
      sx={{
        width: isLargeScreen ? "60%" : "100%",
        height: 19,
        position: "relative",
        mt: 3,
      }}
    >
      <Box sx={{ width: "85%", marginLeft: "7.7%" }}>
        <Slider
          value={value}
          step={null}
          max={sections.length - 1}
          sx={{
            height: 5,
            "& .MuiSlider-thumb": {
              width: 12.01,
              height: 12.01,
              backgroundColor: "#1E2B55",
              border: "none",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-rail, & .MuiSlider-track": {
              backgroundImage:
                "linear-gradient(90deg, #34BEED 0%, #1868AF 50.28%, #1E2B55 100%)",
              border: "none",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 1,
        }}
      >
        {sections.map((section, index) => (
          <StepLabel
            key={section.label}
            sx={getLabelStyle(index)}
            onClick={() => {
              if (index <= value || sections[index].visited) {
                setValue(index);
                navigateTo(index);
              }
            }}
          >
            {section.label}
          </StepLabel>
        ))}
      </Box>
    </Box>
  );
}
