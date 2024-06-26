import React, {useEffect, useState} from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SelectBtn from "../components/SelectBtn";
import FaqItem from '../components/FaqItem';
import {useStatus} from "../statusContext";


const question = "What are the official roles in an estate?";
const answer = "";


function YourRoleInformation(props) {
    const {setStatus, getStatus} = useStatus();
    const [selectedOption, setSelectedOption] = useState(sessionStorage.getItem("officialRole"));
    const [roleOption, setRoleOption] = useState(sessionStorage.getItem("typeOfRole"));
    
    const handleSelect = (option) => {
        setSelectedOption(option);
        sessionStorage.setItem("officialRole", option)
        if(option == "No"){
            setStatus(true);
        }else if(roleOption==null){
            setStatus(false);
        }
    };
    const handleRoleSelect = (option) => {
        setRoleOption(option)
        sessionStorage.setItem("typeOfRole", option)
        if(option!=null && option.length>0){
            setStatus(true);
        }
    }
    useEffect(() => {
        console.log(selectedOption);
        console.log(roleOption);
        if(selectedOption==null){
            setStatus(false);
        }else if(selectedOption=="Yes" && roleOption==null) {
            setStatus(false);
        }else{
            setStatus(true);
        }

    }, []);




    return (
        <Grid container gap='18px'>
            <Grid item xs={12}>
                <Typography variant='regular19'>Contact Information</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: '100%', gap: '32px', display:'flex', flexDirection:'column'}}>
                    <FaqItem  question={question} answer={answer} />
                    <Box >
                    <Typography>Do you have an official role in this estate? </Typography>
                    <SelectBtn optionName="Yes" isSelected={selectedOption === "Yes"} onSelect={handleSelect} />
                    <SelectBtn optionName="No" isSelected={selectedOption === "No"} onSelect={handleSelect} />
                    </Box>
                    {selectedOption === "Yes" ?
                    (<Box>
                    <Typography>What is your official role in the estate? </Typography>
                    <SelectBtn optionName="Executor" isSelected={roleOption === "Executor"} onSelect={handleRoleSelect} />
                    <SelectBtn optionName="Administrator" isSelected={roleOption === "Administrator"} onSelect={handleRoleSelect} />
                    <SelectBtn optionName="Solicitor" isSelected={roleOption === "Solicitor"} onSelect={handleRoleSelect} />
                    </Box>
                    ) : null}
                </Box>

            </Grid>


        </Grid>
    );
}

export default YourRoleInformation;
