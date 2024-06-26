import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {  ListItemIcon, Menu, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Delete from "../images/Delete.png";
import Chosen from "../images/Chosen.png";
import { useOrganisations } from "../OrganisationsContext";

import theme from "../theme";
import { useMediaQuery } from '@mui/material';

const ViewSelect = () => {
 
  const { selectedOrganisations, categories, removeOrganisation } =
    useOrganisations();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const storedData = JSON.parse(
    sessionStorage.getItem("selectedCategoriesDetails")
  );

  const getData = () => {
    let organList = storedData ? Object.values(storedData).flat() : [];
    return organList;
  };

  const OrgList = getData();

  const organisationList = Array.from(selectedOrganisations).map(
    (item) => item.name
  );
  const organisationLogo = Array.from(selectedOrganisations).map(
    (item) => item.logo
  );
  const [items, setItems] = useState(organisationList);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cover, setCover] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
   
    const bankNames = Array.from(selectedOrganisations).map(
      (item) => item.name
    );
    setItems(bankNames);
  }, [selectedOrganisations]); 

  const handleClick = (event) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  
  };

  const handleClose = () => {
    if (anchorEl) {
    
      setAnchorEl(null);
      setIsOpen(!isOpen);
    }
  };

  const handleDelete = (event, itemToDelete) => {
    event.stopPropagation();
    setItems(items.filter((item) => item !== itemToDelete));
    removeOrganisation(itemToDelete);
  };

  return (
    <Grid container>
      <Grid item>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={handleClick}
          sx={{
            // width: "375px",
            width: isLargeScreen? "375px" : "100%",
            height: "49.77px",
            textTransform: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #dddddd",
            borderRadius: "8px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              marginRight: isLargeScreen? "-40px" : "20px",
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "19px",
              color: "black",
            }}
          >
            Selected Organisations
          </span>
          <span
            style={{
              background: "#1868AF",
              color: "white",
              borderRadius: "50%",
              minWidth: "25.77px",
              height: "25.77px",
              width: "25.77px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Rubik",
              fontWeight: "400px",
              fontSize: "16px",
              marginRight: isLargeScreen? "8px" : "80px",
            }}
          >
            {items.length}
          </span>
          {isOpen ? (
            <KeyboardArrowUpIcon color="primary.main" />
          ) : (
            <KeyboardArrowDownIcon color="primary.main" />
          )}
        </Button>
      </Grid>
      <Grid item>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              // width: "375px",
              width: isLargeScreen? "375px" : "100%",
              textTransform: "none",
              marginTop: "10px",
              borderRadius: "8px",
            },
          }}
        >
          {items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              sx={{ display: "flex", justifyContent: "space-between" }}
              style={{ height: 48 }}
            >
              <img
                src={organisationLogo[index]}
                alt={item.name}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 15,
                  fontFamily: "Rubik",
                  fontWeight: "400px",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              />
              <span style={{ flexGrow: 1, textAlign: "left" }}>{item}</span>
              <ListItemIcon
                onClick={(event) => handleDelete(event, item)}
                onMouseEnter={() => setCover(index)}
                onMouseLeave={() => setCover(null)}
              >
                <img
                  src={cover == index ? Chosen : Delete}
                  alt={"deleteIcon"}
                />
              </ListItemIcon>
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default ViewSelect;
