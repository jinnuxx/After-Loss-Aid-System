import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomBtn";
import { useStatus } from "../statusContext";
import SelectedOrganisationList from "../components/SelectedOrganisationList";
import generatePdf from "../components/PdfGeneator";
import { useOrganisations } from "../OrganisationsContext";
function Nextstep({ nextPage }) {
  const navigate = useNavigate();

  const { setStatus, getStatus } = useStatus();

  const initStatus = getStatus();
  const { selectedOrganisations, clearOrganisations } = useOrganisations();
  const [usable, setUsable] = useState(initStatus);
  const categories = JSON.parse(
    sessionStorage.getItem("selectedCategoriesDetails")
  );
  const [text, setText] = useState("Next");

  useEffect(() => {
    setUsable(initStatus);
  }, [initStatus]);

  const downloadAllEmails = async () => {
    for (const name of selectedOrganisations) {
      await generatePdf(name.name, 1);
    }
  };

  const navigateToPage = () => {
    let thisPage = nextPage;
    let temp = thisPage == "/form/selectOrganisations";
    let theNextPage = "";

    switch (thisPage) {
      case "/form/selectOrganisations":
        theNextPage = "/form/deceasedInformation/deceasedPersonalDetails";

        break;
      case "/form/deceasedInformation/deceasedPersonalDetails":
        theNextPage = "/form/deceasedInformation/deceasedContactInformation";

        break;
      case "/form/deceasedInformation/deceasedContactInformation":
        theNextPage = "/form/deceasedInformation/deceasedResidentialAddress";

        break;
      case "/form/deceasedInformation/deceasedResidentialAddress":
        theNextPage = "/form/deceasedInformation/deceasedImportantDetails";

        break;
      case "/form/deceasedInformation/deceasedImportantDetails":
        if (categories === null || categories["Shares"] === undefined) {
          theNextPage = "/form/yourInformation/yourPersonalDetails";
        } else {
          theNextPage = "/form/deceasedInformation/deceasedAdditionalInfo";
        }
        break;
      case "/form/deceasedInformation/deceasedAdditionalInfo":
        theNextPage = "/form/yourInformation/yourPersonalDetails";
        break;
      case "/form/yourInformation/yourPersonalDetails":
        theNextPage = "/form/yourInformation/yourContactInformation";
        break;
      case "/form/yourInformation/yourContactInformation":
        theNextPage = "/form/yourInformation/yourRoleInformation";
        break;
      case "/form/yourInformation/yourRoleInformation":
        theNextPage = "/form/confirm&notify/confirmSelectedOrganisations";
        break;
      case "/form/confirm&notify/confirmSelectedOrganisations":
        theNextPage = "/form/confirm&notify/confirmDeceasedInformation";
        break;
      case "/form/confirm&notify/confirmDeceasedInformation":
        theNextPage = "/form/confirm&notify/confirmYourInformation";
        break;
      case "/form/confirm&notify/confirmYourInformation":
        theNextPage = "/form/downloadEmails";
        break;
      case "/form/sign":
        theNextPage = "/form/downloadEmails";
        break;
    }
    navigate(theNextPage, { state: { visited: true } });
  };

  if (nextPage.includes("/form/downloadEmails")) {
    return (
      <CustomButton
        themePalette="primary"
        onClick={downloadAllEmails}
        disabled={!usable}
        customWidth="294px"
      >
        Download All Emails
      </CustomButton>
    );
  } else if (nextPage.includes("/form/confirm&notify")) {
    return (
      <CustomButton
        themePalette="primary"
        onClick={navigateToPage}
        disabled={!usable}
        customWidth="199px"
      >
        Notify Organisations
      </CustomButton>
    );
  } else if (nextPage.includes("/form/sign")) {
    return (
      <CustomButton
        themePalette="primary"
        onClick={navigateToPage}
        disabled={!usable}
        customWidth="199px"
      >
        Back to Download
      </CustomButton>
    );
  } else {
    return (
      <CustomButton
        themePalette="primary"
        onClick={navigateToPage}
        disabled={!usable}
      >
        Next
      </CustomButton>
    );
  }
}

export default Nextstep;
