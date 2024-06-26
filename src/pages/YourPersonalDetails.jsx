
import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputField from "../components/InputField";

import Nextstep from "../components/Nextstep";
import {useStatus} from "../statusContext";



const nextPage = "/yourInformation/yourContactInformation";

function YourPersonalDetails(props) {

    const {setStatus, getStatus} = useStatus();
    const [userGivenNameValue, setUserGivenNameValue] = useState(sessionStorage.getItem("userGivenName"));
    const [userLastNameValue, setUserLastNameValue] = useState(sessionStorage.getItem("userLastName"));

    const btnUsableDetect = () => {
        let userGivenNameIsInput = false;
        let userLastNameValueIsInput = false;

        if (userGivenNameValue==null){
            userGivenNameIsInput=false;
        }else if(userGivenNameValue.length==0){
            userGivenNameIsInput =false;
        }else{
            userGivenNameIsInput =true;
        }


        if (userLastNameValue==null){
            userLastNameValueIsInput =false;
        }else if(userLastNameValue.length==0){
            userLastNameValueIsInput  =false;
        }else{
            userLastNameValueIsInput  =true;
        }

        if (userGivenNameIsInput && userLastNameValueIsInput   == true){
            setStatus(true);
        }else{
            setStatus(false);
        }

    }

    btnUsableDetect();

    useEffect(() => {
        const interval = setInterval(() => {
            const relatedValue = sessionStorage.getItem('userGivenName');
            if (relatedValue !== userGivenNameValue) {
                setUserGivenNameValue(relatedValue);
            }
        }, 100);

       btnUsableDetect();

        return () => clearInterval(interval);
    }, [userGivenNameValue]);

    useEffect(() => {
        const interval = setInterval(() => {
            const relatedValue = sessionStorage.getItem('userLastName');
            if (relatedValue !== userLastNameValue) {
                setUserLastNameValue(relatedValue);
            }
        }, 100);

        btnUsableDetect();

        return () => clearInterval(interval);
    }, [userLastNameValue]);

    return (
        <Grid container gap='18px' >
            <Grid item xs={12}>
                <Typography variant='regular19'>Personal Details</Typography>
            </Grid>
            <Grid item xs={12}>
                <InputField name="userGivenName" type="text" labelText="Given Name" />
            </Grid>
            <Grid item xs={12}>
                <InputField name="userLastName" type="text" labelText="Last Name" />
            </Grid>
        </Grid>
    );
}

export default YourPersonalDetails;
