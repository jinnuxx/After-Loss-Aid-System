
import React, {useEffect, useState} from 'react';
import { Grid, Box } from '@mui/material';
import InputField from "../components/InputField";
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import theme from "../theme";
import {useStatus} from "../statusContext";
function YourContactInformation() {
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const[userEmailValue,setUserEmailValue] = useState(sessionStorage.getItem("userEmail"));
    const[userPhoneValue,setUserPhoneValue] = useState(sessionStorage.getItem("userPhone"));
    const {setStatus, getStatus} = useStatus();

    const btnUsableDetect = () => {
        let userPhoneIsInput = false;
        let userEmailIsInput = false;
        if (userPhoneValue==null){
            userPhoneIsInput =false;
        }else if(userPhoneValue.length==0){
            userPhoneIsInput  =false;
        }else{
            userPhoneIsInput  =true;
        }
        if (userEmailValue==null){
            userEmailIsInput =false;
        }else if(userEmailValue.length==0){
            userEmailIsInput =false;
        }else{
            userEmailIsInput  =true;
        }

        if (userPhoneIsInput &&  userEmailIsInput   == true){
            setStatus(true);
        }else{
            setStatus(false);
        }

    }


    useEffect(() => {
        const interval = setInterval(() => {
            const relatedValue = sessionStorage.getItem('userEmail');
            if (relatedValue !== userEmailValue) {
                setUserEmailValue(relatedValue);
            }
        }, 100);

        btnUsableDetect();

        return () => clearInterval(interval);
    }, [userEmailValue]);

    useEffect(() => {
        const interval = setInterval(() => {
            const relatedValue = sessionStorage.getItem('userPhone');
            if (relatedValue !== userPhoneValue) {
                setUserPhoneValue(relatedValue);
            }
        }, 100);

        btnUsableDetect();

        return () => clearInterval(interval);
    }, [userPhoneValue]);

    return (
        <Grid container gap='18px' >
            <Grid item xs={12}>
                <Typography variant='regular19'>Contact Information</Typography>
            </Grid>
            <Grid item sx={{ width:isLargeScreen ? '60%' : '100%'  }}>
                    <InputField name="userEmail" type="email" labelText="Email Address" />
                    
            </Grid>
            <Grid item sx={{ width:isLargeScreen ? '60%' : '100%'  }}>
                <InputField name="userPhone" type="tel" labelText="Phone Number" />
            </Grid>
        </Grid>

    );
}

export default YourContactInformation;