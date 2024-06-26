import React from "react";

import { useState } from 'react';
import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { Grid, Fab, Typography } from '@mui/material'

const StyledFab = styled(Fab)({
    width: '21px',
    height: '21px',
    minHeight: '21px'
})

function AddBtn({ onClick, label }) {
    return (
        <Grid container direction='row' gap='8px' alignItems='center'>
            <Grid item>
                <StyledFab
                    onClick={onClick}
                    color='primary'
                >
                    <Add />
                </StyledFab>
            </Grid>
            <Grid item>
                <Typography variant="regular12" color='font.main'>{label}</Typography>
            </Grid>

        </Grid>
    );
}

export default AddBtn;