import React from "react";

import { useState } from 'react';
import Button from '@mui/material/Button'

function DeleteItemBtn({onClick}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    
    return (
        <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disableRipple
            onClick={onClick}
            style={{ border: 'none', background: 'none' }}>
            <svg width="19" height="30" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 19.49H13.5C14.6046 19.49 15.5 18.5946 15.5 17.49V5.48999H3.5V17.49C3.5 18.5946 4.39543 19.49 5.5 19.49Z" fill="#34BEED" stroke="#34BEED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M6.5 1.48999L4.5 5.48999H14.5L12.5 1.48999H6.5Z"
                    stroke="#34BEED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        transform: isHovered ? 'rotate(20deg)' : 'none',
                        transformOrigin: 'right center', 
                    }}
                />
                <path d="M1.5 5.48999H17.5" stroke="#1868AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 9.48999V15.49" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 9.48999V15.49" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Button>
    );
}

export default DeleteItemBtn;