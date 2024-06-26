import React, { useState, useEffect } from "react";
import { colors, Grid, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CustomButton from "../components/CustomBtn";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import DeleteItemBtn from "../components/DeleteItemBtn";
import { map } from "react-bootstrap/ElementChildren";
import OrganisationsList from "../components/OrganisationsList";
import { useOrganisations } from "../OrganisationsContext";
import theme from "../theme";
import { useMediaQuery } from '@mui/material';

export default function ConfirmSelectedOrganisations() {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const { selectedOrganisations, categories, removeOrganisation } =
    useOrganisations();

  const initialData = selectedOrganisations;
  const [categoryMap, setCategoryMap] = useState(new Map());

  useEffect(() => {
    const map = new Map();
    initialData.forEach((org) => {
      const categoryOrganisations = map.get(org.categories) || [];
      map.set(org.categories, [...categoryOrganisations, org]);
    });
    setCategoryMap(map);
  }, []);


  const [storedData, setStoredData] = useState(
    JSON.parse(sessionStorage.getItem("selectedCategoriesDetails"))
  );



  const [myMap, setMyMap] = useState(new Map(Object.entries(storedData)));


  const navigate = useNavigate();


  const goToSelectOrganisations = () => {
   navigate("/form/selectOrganisations");

  };

  const getData = () => {
    let organList = Object.values(storedData);
    console.log(storedData);
    return organList;
  };

  const categoryNameList = Array.from(categoryMap.keys());
  const orgObjectList = Array.from(categoryMap.values());



  function GetName({obj}) {
    return (
      <Grid container gap={"24px"} style={{ width: 400, padding: 15 }}>
        <Grid item>
          <img
            src={obj.logo}
            alt={obj.name}
            style={{ width: 24, height: 24 }}
          />
        </Grid>
        <Grid item>
          <Typography variant={"regular16"} style={{ marginLeft: -10 }}>
            {obj.name}
          </Typography>
        </Grid>

        <Grid item style={{ marginLeft: "auto", marginTop: -15 }}>
          <DeleteItemBtn
            onClick={() => removeOrganisation(obj.name)}
          ></DeleteItemBtn>
        </Grid>
      </Grid>
    );
  }

  function ViewDisplay(){
    let bankList = [];
    let SuperList = [];
    let InsuranceList = [];
    let ShareList = [];
    let EGList = [];
    let TISList = [];
    let WaterList = [];
    let SocialMediaList = [];
    let SubscriList = []
    selectedOrganisations.forEach((org)=>{
      let orgCategory = org.categories;
      switch (orgCategory){
        case "Banks":bankList.push(org);
        break;
        case "Superannuation":SuperList.push(org);
        break;
      }
      if(org.category=="Insurance"){
        InsuranceList.push(org);
      }
      if(org.category=="Shares"){
        ShareList.push(org);
      }
      if(org.category=="Electricity and Gas"){
            EGList.push(org);
      }
        if(org.category=="Telecommunications and Internet Services"){
            TISList.push(org);
        }
        if(org.category=="Water"){
            WaterList.push(org);
        }
        if(org.category=="Social Media"){
            SocialMediaList.push(org);
        }
        if(org.category=="Subscription"){
            SubscriList.push(org);
        }
    });
    return(
        <Grid container>
          {bankList.length>0 && (
              <Grid item xs={12} style={{ marginBottom: 30 }}>
                <Typography variant="large16" >
                  Banks
                </Typography>
                {bankList.map((obj,index)=>(
                  <Grid item xs={12}>
                    <GetName obj={obj}/>
                  </Grid>
                ))}
              </Grid>
          )}
          {SuperList.length>0 && (
              <Grid item xs={12} style={{ marginBottom: 30 }}>
                <Typography variant="large16" >
                  Superannuation
                </Typography>
                {SuperList.map((obj,index)=>(
                    <Grid item xs={12}>
                      <GetName obj={obj}/>
                    </Grid>
                ))}
              </Grid>
          )}
          {InsuranceList.length>0 && (
              <Grid item xs={12} style={{ marginBottom: 30 }}>
                <Typography variant="large16" >
                  Insurance
                </Typography>
                {InsuranceList.map((obj,index)=>(
                    <Grid item xs={12}>
                      <GetName obj={obj}/>
                    </Grid>
                ))}
              </Grid>
          )}
          {ShareList.length>0 && (
              <Grid item xs={12} style={{ marginBottom: 30 }}>
                <Typography variant="large16" >
                  Shares
                </Typography>
                {ShareList.map((obj,index)=>(
                    <Grid item xs={12}>
                      <GetName obj={obj}/>
                    </Grid>
                ))}
              </Grid>
          )}
            {EGList.length>0 && (
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                    <Typography variant="large16" >
                        Electricity and Gas
                    </Typography>
                    {EGList.map((obj,index)=>(
                        <Grid item xs={12}>
                            <GetName obj={obj}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            {TISList.length>0 && (
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                    <Typography variant="large16" >
                        Telecommunications and Internet Services
                    </Typography>
                    {TISList.map((obj,index)=>(
                        <Grid item xs={12}>
                            <GetName obj={obj}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            {WaterList.length>0 && (
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                    <Typography variant="large16" >
                        Water
                    </Typography>
                    {WaterList.map((obj,index)=>(
                        <Grid item xs={12}>
                            <GetName obj={obj}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            {SocialMediaList.length>0 && (
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                    <Typography variant="large16" >
                        Social Media
                    </Typography>
                    {SocialMediaList.map((obj,index)=>(
                        <Grid item xs={12}>
                            <GetName obj={obj}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            {SubscriList.length>0 && (
                <Grid item xs={12} style={{ marginBottom: 30 }}>
                    <Typography variant="large16" >
                        Subscription
                    </Typography>
                    {SubscriList.map((obj,index)=>(
                        <Grid item xs={12}>
                            <GetName obj={obj}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    )


  }

    return (
        <Grid container width={isLargeScreen ? '1152px' : '100%'} >
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end" width={isLargeScreen ? '1152px' : '100%'}>
                    <Grid item>
                        <CustomButton
                            onClick={goToSelectOrganisations}
                            themePalette="secondary"
                        >
                            Add Organisations
                        </CustomButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <ViewDisplay></ViewDisplay>
            </Grid>
        </Grid>
    );
}
