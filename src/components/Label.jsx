import React from "react";
import { Typography } from "@mui/material";
function Label({ labelText }) {
    const isOptional = labelText.includes('(optional)');
    return (
        <>

            {isOptional ? (
                <>
                    <Typography variant="thin13" color='font.main'>{labelText.split('(optional)')[0]}</Typography>
                    <Typography variant="thin13" color='font.light'>(optional)</Typography>
                </>
            ) : (
                <Typography variant="thin13" color='font.main'>{labelText}</Typography>
            )}
        </>

    );
}

export default Label;