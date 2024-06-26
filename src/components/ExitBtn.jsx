import React from "react";

import Button from '@mui/material/Button'



function ExitBtn({handleClick}) {
    
    
    return(
    <Button disableRipple onClick={handleClick}  style={{ minWidth: '24px',background: 'none',   padding: '0',  background: 'none'}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <circle cx="12" cy="12" r="9" fill="#FF4B4B" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10L10 14" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 10L14 14" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </Button>
);


}

export default ExitBtn;