import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import InputField from "../components/InputField";
import AddBtn from "../components/AddBtn";
import DeleteItemBtn from "../components/DeleteItemBtn";
import FaqList from "../components/FaqList";

import { useOrganisations } from "../OrganisationsContext";
import { Button } from "react-bootstrap";

function DeceasedAdditionalInfo() {


  const { selectedOrganisations, categories, removeOrganisation } =
    useOrganisations();


  const [additionalInfos, setAdditionalInfos] = useState([]);


  const shares = selectedOrganisations.filter(
    (org) => org.category === "Shares"
  );


  useEffect(() => {
    if (shares) {
      setAdditionalInfos(shares.map(() => [""]));
    }
  }, []);
  const handleClick = (index) => {
    setAdditionalInfos((prevInfos) => {
      const newInfos = [...prevInfos];
      console.log(newInfos);
      // console.log(index);
      if (!Array.isArray(newInfos[index])) {
        newInfos[index] = [];
      }
      if (newInfos[index].length < 3) {  // Check if there are less than 3 entries
        newInfos[index] = [...newInfos[index], ""];
      }
      return newInfos;
    });
  };

  const handleDelete = (index) => {
    setAdditionalInfos((prevInfos) => {
      const newInfos = [...prevInfos];
      newInfos.splice(index,1); // Remove the entry at the specified index
      console.log(newInfos);
      return newInfos;
      
    });
    

    const shares = selectedOrganisations.filter(
      (org) => org.category === "Shares"
    );
    const shareIndex = shares.findIndex((share, i) => i === index);
    if (shareIndex !== -1) {
      removeOrganisation(shares[shareIndex].name);
    }
  };
  

  return (
    <Box>
      <Grid container gap="24px" style={{ width: "100%" }}>
        <Grid item style={{ width: "100%" }}>
          <Grid container gap="8px">
            <Grid item>
              <Typography variant="regular19">Share Holdings</Typography>
            </Grid>
            <Grid item>
              <Typography variant="regular13">
                To inform the organisation about the death, you'll need a
                Securityholder Reference Number (SRN) or Holder Identification
                Number (HIN). If you are unable to find the number, please
                delete the organisation to proceed with the notification
                process.{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <FaqList />
        </Grid>

        <Grid item style={{ width: "100%" }}>
          {shares.map((share, index) => (
            <Grid container direction="column" gap="18px" key={index} style={{marginBottom: "40px"}}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container justifyContent="space-between" gap="12px">
                      <Grid item>
                        <img
                          style={{ width: "24px", height: "24px" }}
                          src={share.logo}
                          alt={share.name}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="regular19" color="font.special">
                          {share.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="medium14"
                          color="special"
                          style={{
                            backgroundColor: "#EFEFEF",
                            borderRadius: "32px",
                            padding: "6px 12px",
                          }}
                        >
                          Shareholding
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <DeleteItemBtn onClick={() => handleDelete(index)} />
                  </Grid>
                </Grid>
              </Grid>
              {additionalInfos[index] &&
                additionalInfos[index].map((info, subIndex) => (
                  <Grid item key={`${index}-${subIndex}`}>
                    <InputField
                      name={`srn-hin-${index}-${subIndex}`}
                      labelText="Securityholder Reference Number (SRN) or Holder Identification Number (HIN)"
                    />
                  </Grid>
                ))}
              {additionalInfos[index] && additionalInfos[index].length < 3 && (
                <Grid item>
                  <Grid
                    container
                    gap="4px"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item>
                      <AddBtn onClick={() => handleClick(index)} />
                    </Grid>
                    <Grid item>
                      <Typography variant="thin13">Add Another</Typography>
                    </Grid>
                  </Grid>
                </Grid>)}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DeceasedAdditionalInfo;
