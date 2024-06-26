import React, { useState, useEffect, useRef } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useMediaQuery } from '@mui/material';
import theme from "../theme";


import FurtherFilter from "./FurtherFilter";
import { useOrganisations } from "../OrganisationsContext";

import { useStatus } from "../statusContext";


const OrganisationsList = () => {
  const {
    categories,
    categories_common,
    selectedOrganisations,
    addOrganisation,
    removeOrganisation,
  } = useOrganisations();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { getStatus, setStatus } = useStatus();

  const [selectedBank, setSelectedBank] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([
    "Common Orgainisations",
  ]);
  const [resetSelectionFlag, setResetSelectionFlag] = useState(false);
  const [isUtilitiesSelected, setIsUtilitiesSelected] = useState(false);

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isFilterHovered, setIsFilterHovered] = useState(false);

  const [furtherFilterSelection, setFurtherFilterSelection] = useState([]);

  const targetButtonRef = useRef(null);

  const checkStatus = (org) => {
    if (org.length == 0) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  useEffect(() => {
    const storedSelection = sessionStorage.getItem("furtherFilterSelection");
    if (storedSelection) {
      setFurtherFilterSelection(JSON.parse(storedSelection));
    }
  }, []);

  useEffect(() => {
    const bankNames = selectedOrganisations.map((org) => org.name);
    setSelectedBank(bankNames);
    checkStatus(bankNames);
  }, [selectedOrganisations]); 

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };
  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleFilterMouseEnter = () => {
    setIsFilterHovered(true);
  };
  const handleFilterMouseLeave = () => {
    setIsFilterHovered(false);
  };

  const handleSelectionChange = (hasSelection) => {
    setIsUtilitiesSelected(hasSelection);
  };

  const handleBankChange = (bank) => {
    setSelectedBank((prevBanks) => {
      if (prevBanks.includes(bank)) {
      
        removeOrganisation(bank); 
        return prevBanks.filter((b) => b !== bank);
      } else {
        addOrganisation({ name: bank }); 
        return [...prevBanks, bank];
      }
    });
  };

  const getSelectedCategories = () => {
    let selectedCategoriesOutput = {};
    Object.keys(categories).forEach((category) => {
      const selectedOrgsInCategory = categories[category].filter((org) =>
        selectedBank.includes(org.name)
      );
      if (selectedOrgsInCategory.length > 0) {
        selectedCategoriesOutput[category] = selectedOrgsInCategory;
      }
    });

    return selectedCategoriesOutput;
  };

  const selectedCategoriesDetails = getSelectedCategories();

  sessionStorage.setItem(
    "selectedCategoriesDetails",
    JSON.stringify(selectedCategoriesDetails)
  );

  const [externalCategories, setExternalCategories] = useState([]);

  const handleCategoryChange = (event, newCategory, isExternal = false) => {
    console.log("newCategory", newCategory);
    if (isExternal) {
      setExternalCategories(newCategory);

      if (
        (newCategory.includes("Common Orgainisations") &&
          newCategory[0] !== "Common Orgainisations") ||
        newCategory.length < 1
      ) {
        setSelectedCategories(["Common Orgainisations"]);
        setResetSelectionFlag(true);
      } else if (selectedCategories.includes("Common Orgainisations")) {
        setSelectedCategories(
          newCategory.filter((category) => category !== "Common Orgainisations")
        );
      } else {
       
        const newSelectedCategories = selectedCategories
          .filter((category) => !externalCategories.includes(category)) 
          .concat(newCategory); 

        setSelectedCategories(newSelectedCategories);
      }
    } else {

      if (
        (newCategory.includes("Common Orgainisations") &&
          newCategory[0] !== "Common Orgainisations") ||
        newCategory.length < 1
      ) {
        setSelectedCategories(["Common Orgainisations"]);
        setResetSelectionFlag(true);
      } else if (selectedCategories.includes("Common Orgainisations")) {
        setSelectedCategories(
          newCategory.filter((category) => category !== "Common Orgainisations")
        );
      } else {
        setSelectedCategories(newCategory);
      }
    }
  };

  const selectedStyle = {
    backgroundColor: "#1868AF",
    color: "#FFF",
    borderRadius: "120px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textTransform: "none",
    marginRight: "12px",
    height: "43px",
    padding: "20px 20px ",
    fontWeight: "500",
  };
  const unselectedStyle = {
    backgroundColor: "#FFF",
    color: "#000",
    borderRadius: "120px",
    border: "1px solid #E0E0E0",
    textTransform: "none",
    marginRight: "12px",
    height: "43px",
    padding: "20px 20px ",
    fontWeight: "500",
  };

  const toggleButtonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "flex-start",
    width: "100%",
  };

  const getToggleButtonStyle = (itemName) => ({
    width: isLargeScreen ? '350px' : '100%',
    height: "72px",
    padding: "30px",
    gap: "12px",
    borderRadius: "10px",
    textTransform: "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: selectedBank.includes(itemName) ? "#DEEAFA" : "#FCFCFC",
    border: selectedBank.includes(itemName)
      ? "1px solid #1868AF"
      : "1px solid #DADADA",
  });

  const textStyle = {
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "22.8px",
    textAlign: "left",
    color: "#000000",
    width: "197px",
  };

  const renderToggleButtons = () => {
    let activeCategories = selectedCategories.includes("Common Orgainisations")
      ? categories_common
      : categories;

    return Object.keys(activeCategories).flatMap((category) => {
      if (
        !selectedCategories.includes(category) &&
        !selectedCategories.includes("Common Orgainisations")
      ) {
        return [];
      }

      const categoryButtons = activeCategories[category].map((item) => (
        <ToggleButton
          key={item.name}
          value={item.name}
          aria-label={item.name}
          style={getToggleButtonStyle(item.name)}
          onClick={() => handleBankChange(item.name)}
          selected={selectedBank.includes(item.name)}
        >
          {selectedBank.includes(item.name) && (
            <CheckCircleIcon
              style={{ width: "16px", height: "16px", color: "#3166AA" }}
            />
          )}
          <img
            src={item.logo}
            alt={item.name}
            style={{ width: "24px", height: "24px", marginRight: "8px" }}
          />
          <span style={textStyle}>{item.name}</span>
          {category === "Shares" && (
            <span
              style={{
                minWidth: "72px",
                height: "29px",
                padding: "6px 12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#1D1D1D",
                fontWeight: "500",
                lineHeight: "16.59px",
                fontFamily: "Rubik",
                backgroundColor: "#EFEFEF",
                borderRadius: "32px",
                marginLeft: "8px",
                flex: "none",
              }}
            >
              Shares
            </span>
          )}
        </ToggleButton>
      ));
      return (
        <div key={category} style={{ marginBottom: "64px" }}>
          {category !== "Utilities" && (
            <React.Fragment key={category}>
              <h2
                style={{
                  fontFamily: "Rubik",
                  fontWeight: "500",
                  fontSize: "23px",
                  marginBottom: "20px",
                }}
              >
                {category}
              </h2>
              <div style={toggleButtonContainerStyle}>{categoryButtons}</div>
            </React.Fragment>
          )}
        </div>
      );
    });
  };

  return (
    <Grid
      container
      style={{
        width: "100%",
        marginTop: "36px",
        marginBottom: "50px",
      }}
    >
      <Grid item>
        <ToggleButtonGroup
          onChange={handleCategoryChange}
          value={selectedCategories}
          // key={selectedCategories}
          aria-label="category selection"
          style={{ marginBottom: "45px", flexWrap: "wrap", gap: isLargeScreen ? '0px' : '10px'}}
        >
          <ToggleButton
            value="Common Orgainisations"
            // key={"Common Orgainisations"}
            aria-label="Common Orgainisations"
            style={
              selectedCategories.includes("Common Orgainisations")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Common Orgainisations
          </ToggleButton>
          <ToggleButton
            value="Banks"
            // key={"Banks"}
            aria-label="Banks"
            style={
              selectedCategories.includes("Banks")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Banks
          </ToggleButton>
          <ToggleButton
            value="Superannuation"
            // key={"Superannuation"}
            aria-label="Superannuation"
            style={
              selectedCategories.includes("Superannuation")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Superannuation
          </ToggleButton>
          <ToggleButton
            value="Insurance"
            // key={"Insurance"}
            aria-label="Insurance"
            style={
              selectedCategories.includes("Insurance")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Insurance
          </ToggleButton>
          <ToggleButton
            value="Shares"
            // key={"Shares"}
            aria-label="Shares"
            style={
              selectedCategories.includes("Shares")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Shares
          </ToggleButton>
          <ToggleButton
            value="Utilities"
            // key={"Utilities"}
            aria-label="Utilities"
            style={
              selectedCategories.includes(
                "Telecommunications and Internet Services"
              ) ||
              selectedCategories.includes("Electricity and Gas") ||
              selectedCategories.includes("Water")
                ? selectedStyle
                : unselectedStyle
            }
            ref={targetButtonRef}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Utilities
          </ToggleButton>
          <ToggleButton
            value="Social Media"
            key={"Social Media"}
            aria-label="Social Media"
            style={
              selectedCategories.includes("Social Media")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Social Media
          </ToggleButton>
          <ToggleButton
            value="Subscription"
            // key={"Subscription"}
            aria-label="Subscription"
            style={
              selectedCategories.includes("Subscription")
                ? selectedStyle
                : unselectedStyle
            }
          >
            Subscription
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        {renderToggleButtons()}
        {isButtonHovered || isFilterHovered ? (
          <FurtherFilter
            style={{
              display: isButtonHovered || isFilterHovered ? "block" : "none",
            }}
            // key={selectedCategories}
            onSelectionChange={handleSelectionChange}
            onCategoryChange={handleCategoryChange}
            targetButtonRef={targetButtonRef}
            onMouseEnter={handleFilterMouseEnter}
            onMouseLeave={handleFilterMouseLeave}
            selectedCategories={furtherFilterSelection}
            setSelectedCategories={setFurtherFilterSelection}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default OrganisationsList;
