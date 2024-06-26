import "./PDFUploader.css";
import { useRef, useState, useEffect } from "react";
import PDFDrop from "./PDFDrop";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import { blobToURL } from "../utils/Utils";
import CustomButton from "./CustomBtn";
import theme from "../theme";
import { Typography, useMediaQuery } from "@mui/material";
import {
  PagingControl,
  AddSigDialog,
  DraggableSignature,
  DraggableText,
} from "./PDFComponents";
import dayjs from "dayjs";
import { Grid } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function PDFUploader() {
  const styles = {
    sigBlock: {
      display: "inline-block",
      border: "1px solid #000",
    }
  };
  const [pdf, setPdf] = useState(null);
  const [autoDate, setAutoDate] = useState(true);
  const [signatureURL, setSignatureURL] = useState(null);
  const [position, setPosition] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);
  const documentRef = useRef(null);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  useEffect(() => {
    const pdfData =sessionStorage.getItem("PDF");
    if (pdfData) {
      setPdf(pdfData);
    }
  }, []);

  return (
    <>
    {isLargeScreen?( <Grid container style={{ width: '60%' ,margin:'0 auto'}} >
    <Grid item style={{ width: '100%' }}>
      {signatureDialogVisible ? (
        <AddSigDialog
          autoDate={autoDate}
          setAutoDate={setAutoDate}
          onClose={() => setSignatureDialogVisible(false)}
          onConfirm={(url) => {
            setSignatureURL(url);
            setSignatureDialogVisible(false);
          }}
        />
      ) : null}

    </Grid>
    <Grid item style={{ width: '100%' }}>
      {1 ? (
        <PDFDrop
          onLoaded={async (files) => {
            const URL = await blobToURL(files[0]);
            setPdf(URL);
          }}
        />
      ) : null}

    </Grid>

    <Grid item style={{ width: '100%' }}>
      {pdf ? (
        <div>
          <Grid container justifyContent='space-between' style={{ width: '100%' }}>
            <Grid item>
              {!signatureURL ? (
                <CustomButton
                  themePalette="primary"
                  onClick={() => {
                    setSignatureDialogVisible(true);
                  }}
                  customWidth="150px"

                >
                  Add Signature
                </CustomButton>
              ) : null}

            </Grid>
            <Grid item>
              <CustomButton
                themePalette="primary"

                onClick={() => {
                  setTextInputVisible(false);
                  setSignatureDialogVisible(false);
                  setSignatureURL(null);
                  setPdf(null);
                  setTotalPages(0);
                  setPageNum(0);
                  setPageDetails(null);
                }}
                customWidth="100px"
              >
                Reset
              </CustomButton>

            </Grid>
            <Grid item>
              {pdf ? (
                <CustomButton
                  themePalette="primary"
                  onClick={() => downloadURI(pdf, "file.pdf")}
                  customWidth="130px"

                >
                  Download
                </CustomButton>
              ) : null}

            </Grid>
          </Grid>
          <Grid container  style={{ width: '100%', border: "1px solid #999", margin: "10px 0"}} ref={documentRef}>
            <Grid item width='100%'>
              {signatureURL ? (
                <DraggableSignature
                  url={signatureURL}
                  onCancel={() => {
                    setSignatureURL(null);
                  }}
                  onSet={async () => {
                    const { originalHeight, originalWidth } = pageDetails;
                    console.log(originalHeight);
                    console.log(originalWidth);
                    const scale =
                      originalWidth / documentRef.current.clientWidth;

                    const y =
                      documentRef.current.clientHeight -
                      (position.y +
                        12 * scale -
                        position.offsetY -
                        documentRef.current.offsetTop);
                    const x =
                      position.x -
                      166 -
                      position.offsetX -
                      documentRef.current.offsetLeft;
                    const newY =
                      (y * originalHeight) / documentRef.current.clientHeight;
                    const newX =
                      (x * originalWidth) / documentRef.current.clientWidth;

                    const pdfDoc = await PDFDocument.load(pdf);

                    const pages = pdfDoc.getPages();
                    const firstPage = pages[pageNum];

                    const pngImage = await pdfDoc.embedPng(signatureURL);
                    const pngDims = pngImage.scale(scale * 0.3);

                    firstPage.drawImage(pngImage, {
                      x: newX,
                      y: newY,
                      width: pngDims.width,
                      height: pngDims.height,
                    });

                    if (autoDate) {
                      firstPage.drawText(
                        `Signed ${dayjs().format("DD/MM/YYYY HH:mm:ss")}`,
                        {
                          x: newX + 10,
                          y: newY - 10,
                          size: 10 * scale,
                          color: rgb(0, 0, 0),
                        }
                      );
                    }

                    const pdfBytes = await pdfDoc.save();
                    const blob = new Blob([new Uint8Array(pdfBytes)]);

                    const URL = await blobToURL(blob);
                    setPdf(URL);
                    setPosition(null);
                    setSignatureURL(null);
                  }}
                  onEnd={setPosition}
                />
              ) : null}
            </Grid>
            <Grid item style={{ width: '100%'}}>
              <PagingControl
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPages={totalPages}

              />
            </Grid>
            <Grid item style={{ width: '100%', overflow: 'auto' }}>
              <Document
                debug={true}
                file={pdf}
                onLoadSuccess={(data) => {
                  setTotalPages(data.numPages);
                }}
              >
                <Page
                  debug={true}
                  pageNumber={pageNum + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onLoadSuccess={(data) => {
                    setPageDetails(data);
                  }}
                />
              </Document>
            </Grid>
          </Grid>
        </div>

      ) : null}
    </Grid>

  </Grid>):(<Typography variant='bold23'>Sorry, the signature feature is only available on the desktop web version.</Typography>)}
   
  </>
  );
}

export default PDFUploader;
