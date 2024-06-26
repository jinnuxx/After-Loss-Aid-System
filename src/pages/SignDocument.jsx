import React, { useRef, useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import PdfUploader from "../components/PDFUploader";
import PdfViewer from "../components/PDFUploader";
import { Button } from "@mui/material";

function SignDocument() {
  const [file, setFile] = useState(null);

  const downloadStoredPdf = () => {
    const pdfData =sessionStorage.getItem("PDF");
    if (pdfData) {
      const link = document.createElement("a");
      link.href = pdfData;
      link.download = "_email.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No PDF file found.");
    }
  };

  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    // if (file && file.type === "application/pdf") {
    //   setFile(file);
    // } else {
    //   alert("Please upload a PDF file.");
    // }
  };

  return (
    <div>
      <PdfUploader onFileUpload={handleFileChange} />
      
    </div>
  );
}

export default SignDocument;
