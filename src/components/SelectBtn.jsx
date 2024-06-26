import React from "react";
import { Box, Button, Typography } from '@mui/material';

function SelectBtn({ optionName, isSelected, onSelect }) {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Button disableRipple onClick={() => onSelect(optionName)} style={{ border: 'none', background: 'none', cursor:'pointer'}}>
                {isSelected ? (
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.245" width="19" height="19" rx="9.5" stroke="#1D1D1D"/>
                        <rect x="4.5" y="4.745" width="12" height="12" rx="6" fill="#1868AF"/>
                    </svg>
                ) : (
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.245" width="19" height="19" rx="9.5" stroke="#969696"/>
                    </svg>
                )}
            </Button>
            <Typography style={{ verticalAlign: 'middle', display: 'inline' }}>{optionName}</Typography>
        </Box>
    );
}

export default SelectBtn;
