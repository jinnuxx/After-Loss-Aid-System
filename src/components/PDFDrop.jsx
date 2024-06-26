import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";


export default function PDFDrop({ onLoaded }) {
  const styles = {
    container: {
      textAlign: "center",
      padding: 8,
      marginTop: 12,
      fontSize: 18,

      borderRadius: 10,
      userSelect: "none",
      outline: 0,
      cursor: "pointer",
      width: "185px",
      height: "39px",
      backgroundColor: "var(--button-main-bg, #1868af)",
      color: "var(--button-main-font, #fff)",

      "&:hover": {
        backgroundColor: "var(--button-hover-bg, #9df0f6)",
        color: "var(--button-hover-font, #333)",
        border: "1px solid var(--button-hover-border, #aaa)",
      },
    },
  };

  const onDrop = useCallback((acceptedFiles) => {
    onLoaded(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  return (
    <div {...getRootProps()} style={styles.container}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop a PDF here</p> : <p>Drag a PDF here</p>}
    </div>
  );
}
