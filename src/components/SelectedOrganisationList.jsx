import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import SelectedOrganisation from './SelectedOrganisation';

const SelectedOrganisationList = ({ onClick }) => {
    const [storedData, setStoredData] = useState(JSON.parse(sessionStorage.getItem("selectedCategoriesDetails")));
   
    const [organList, setOrganList] = useState(new Map(Object.entries(storedData)));
    return (
        <>
            {((Object.keys(storedData).length === 0) ? (
                <Typography>Please select an organisation</Typography>
            ) : (
                <Grid container gap='48px'>
                    {Array.from(organList).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <Grid container gap='18px'>
                                <Grid item xs={12}>
                                    <Typography variant="large16">{key}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectedOrganisation obj={value} onClick={onClick} />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            ))}
        </>
    )
}

export default SelectedOrganisationList;