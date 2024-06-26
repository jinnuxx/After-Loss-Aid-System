import React from "react";
import CustomButton from '../components/CustomBtn'
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useOrganisations } from "../OrganisationsContext";
function Home(props) {
  const {clearOrganisations}=useOrganisations();
  const navigate=useNavigate();
  function handleClick (){
    clearOrganisations();
    sessionStorage.clear();

    navigate('/form/selectOrganisations');
  }
  return (
    <Box>
      <CustomButton themePalette="secondary" onClick={handleClick} customWidth='298px'>
        Notify Organisations
      </CustomButton>
    </Box>
  );
}

export default Home;
