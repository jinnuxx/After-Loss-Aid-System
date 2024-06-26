import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import theme from "../theme";
import ResultBar from "./ResultBar";

function SearchBar({ onAdd }) {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const resultBarRef = useRef(null);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const getIsOpenFromChild = (isOpen) => {
    setIsOpen(isOpen);
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
    setShowPopup(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        resultBarRef.current &&
        !resultBarRef.current.contains(event.target)
      ) {
        if (!isOpen) {
          setShowPopup(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultBarRef, isOpen]);

  return (
    <Grid container>
      <Grid item style={{ width: "calc(100%)" }} md={5.5} sm={12} xs={12}>
        <Grid item>
          <TextField
            value={inputValue}
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3489 16.1743L11.8867 12.7122"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.7544 8.2029C13.7544 9.96391 13.0406 11.5582 11.8866 12.7123C10.7325 13.8663 9.13823 14.5801 7.37721 14.5801C3.85517 14.5801 1 11.7249 1 8.2029C1 4.68086 3.85517 1.82568 7.37721 1.82568C10.8992 1.82568 13.7544 4.68086 13.7544 8.2029Z"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </InputAdornment>
              ),
              style: {
                borderRadius: "50px",
                fontWeight: 400,
                fontSize: "16px",

                lineHeight: "19.2px",
                fontFamily: "Rubik, sans-serif",
              },
            }}
            placeholder="Search 12,000+ Organisations"
            fullWidth
            sx={{
              borderRadius: "50px",
            }}
          />
        </Grid>

        <Grid item style={{ width: "calc(100%)", position: "relative" }}>
          {showPopup && (
            <div ref={resultBarRef}>
              <ResultBar
                inputValue={inputValue}
                isOpenCheck={getIsOpenFromChild}
                onAdd={onAdd}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
