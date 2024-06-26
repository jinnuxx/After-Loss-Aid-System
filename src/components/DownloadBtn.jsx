import { Button } from "@mui/material";
import React from "react";

export default function DownloadBtn({ onClick }) {
  return (
    <Button onClick={onClick} style={{ border: "none", background: "none" }}>
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 22L14 9"
          stroke="#58A700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 17L14 22L19 17"
          stroke="#58CC02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 26H8"
          stroke="#58CC02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
