import React, { useState } from "react";
import ViewSelect from "../components/ViewSelect";

import { Typography, Grid, Container } from "@mui/material";

import OrganisationsList from "../components/OrganisationsList";
import { useOrganisations } from "../OrganisationsContext";
import SearchBar from "../components/SearchBar";
import Prompt from "../components/Prompt";

export default function SelectOrganisations() {
  const { categories, setCategories } = useOrganisations();
  
  const [open, setOpen] = useState(false);

  const [text,setText] = useState('');
  const handleAdd = (type, newOrganisation) => {
    let updatedOrganisations = { ...categories };
    if (!updatedOrganisations.hasOwnProperty(type)) {
      setText('Sorry, the organisation type does not exist!');
      
    } else if(updatedOrganisations[type].find(org => org.name === newOrganisation.name)){
      setText('Sorry, the organisation has already exist!');
    }else{
      updatedOrganisations[type] = [...categories[type], newOrganisation];
      setCategories(updatedOrganisations);
      setText('The organisation has been nominated successfully! Please go to the corresponding category for checking.');
    }
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container style={{ width: "100%" }}>
      <Grid container direction="column" justifyContent="center">
        <Grid item >
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginBottom: "20px" }}
          >
            <Grid item>
              <ViewSelect />
            </Grid>
          </Grid>
        </Grid>
        <Grid item >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            gap="36px"
          >
            <Grid item>
              <Typography variant="medium19" color="font.main">
                Select organisations to notify about the passing.
              </Typography>
            </Grid>
            <Grid item>
              <SearchBar onAdd={handleAdd} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item >
          <OrganisationsList />
        </Grid>
        <Prompt text={text} open={open} onClose={handleClose} />

      </Grid>
    </Container>
  );
}
