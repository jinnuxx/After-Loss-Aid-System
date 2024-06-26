import React from 'react'
import theme from "../theme";
import { Grid, useMediaQuery, Divider } from '@mui/material';
import Nextstep from './Nextstep';
import CustomButton from './CustomBtn';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Footer() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const location = useLocation();
    const navigate = useNavigate();
    const handleBack = () => {
      navigate(-1);
    };
   
  
    return (
        <Grid sx={{ margin: "5%" }}>
            <Divider variant="middle" style={{ margin: '20px 0', borderStyle: 'dashed', marginBottom: '30px' }} />
            {
                !location.pathname.includes( "/form/selectOrganisations") &&
                !location.pathname.includes("/form/downloadEmails") &&
                !location.pathname.includes("/form/sign") &&
                isSmallScreen ? (
                    <Grid container justifyContent="space-between">
                        <Grid item >
                            <CustomButton themePalette="primary" onClick={handleBack}>
                                Back
                            </CustomButton>
                        </Grid>
                        <Grid item>
                            <Nextstep nextPage={location.pathname} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justifyContent="flex-end" >
                        <Grid item>
                            <Nextstep nextPage={location.pathname} />
                        </Grid>
                    </Grid>
                )
            }
        </ Grid>
    )
}
