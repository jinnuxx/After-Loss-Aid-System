import React, { useState } from 'react'
import styled from "@emotion/styled";
import { Box, Grid, Modal, Typography } from "@mui/material";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import ExitBtn from "./ExitBtn";
export default function Prompt({ text, open, onClose }) {
    
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <>
            <Modal open={open}>
                <Box
                    sx={{
                        width: isLargeScreen ? "503px" : "100%" ,
                        bgcolor: "background.default",
                        borderRadius: "10px",
                        padding: isLargeScreen ?'30px':'10px',
                    }}>
                    <Grid container gap="12px">
                        <Grid
                            item
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <ExitBtn handleClick={onClose} />
                        </Grid>
                        <Grid item sx={{ width: "100%" }}>
                            <Typography variant="regular16" color="font.main">
                                {text}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}
