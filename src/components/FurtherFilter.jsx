import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function FurtherFilter({
  targetButtonRef,
  onMouseEnter,
  onMouseLeave,
  onCategoryChange,
  resetSelection,
  onSelectionChange,
  selectedCategories, 
  setSelectedCategories, 
}) {
  const categories = [
    "All",
    "Telecommunications and Internet Services",
    "Electricity and Gas",
    "Water",
  ];

  const [listPosition, setListPosition] = useState({ top: 0, left: 0 }); 

  useEffect(() => {
    setSelectedCategories(selectedCategories);
  }, [selectedCategories]);
  useEffect(() => {
  
    if (resetSelection) {
      setSelectedCategories([]);
    }
  }, [resetSelection]);

  useEffect(() => {
    if (targetButtonRef.current) {
      const { top, left, height } =
        targetButtonRef.current.getBoundingClientRect();
      setListPosition({ top: top + height, left }); 
    }
  }, [targetButtonRef]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        "furtherFilterSelection",
        JSON.stringify(selectedCategories)
      );
    };
  }, [selectedCategories]);

  const handleToggle = (value) => {
    let newCategory;

    if (value === "All") {
      if (selectedCategories.includes("All")) {
       
        newCategory = [];
      } else {
       
        newCategory = [
          "All",
          ...categories.filter((category) => category !== "All"),
        ];
      }
    } else {
      if (selectedCategories.includes(value)) {
     
        newCategory = selectedCategories.filter(
          (category) => category !== value
        );
       
        if (newCategory.includes("All")) {
          newCategory = newCategory.filter((category) => category !== "All");
        }
      } else {
       
        newCategory = [...selectedCategories, value];
      
        if (
          categories.every(
            (category) => newCategory.includes(category) || category === "All"
          )
        ) {
          newCategory.push("All");
        }
      }
    }

    setSelectedCategories(newCategory);

    if (onCategoryChange) {
      onCategoryChange({ target: { value } }, newCategory, true);
    }
    if (onSelectionChange) {
      onSelectionChange(newCategory.length > 0);
    }
  };

  return (
    <List
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: listPosition.top, 
        left: listPosition.left,
        zIndex: 1000, 
        width: "436px",
        height: "212px",
        backgroundColor: "#FCFCFC",
        borderRadius: "12px",
        padding: "18px 8px",
        border: "1px solid #ccc",
        borderColor: "#DADADA",
        boxShadow: "0px 6px 15px 0px #0000001A",
      }}
    >
      {categories.map((value) => (
        <ListItem key={value} disablePadding>
          <ListItemButton
            role={undefined}
            dense
            onClick={() => handleToggle(value)}
            style={{
              width: "420px",
              height: "44px",
              padding: "12px 24px",
              justifyContent: "flex-start",
            }}
          >
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={selectedCategories.includes(value)}
            />
            <ListItemText
              primary={value}
              sx={{
                marginLeft: "10px",
                typography: "pagecontent",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
