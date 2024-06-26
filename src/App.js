import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { OrganisationsProvider } from "./OrganisationsContext";

import FormLayout from "./layout/FormLayout";
import Home from "./pages/Home";
import SelectOrganisations from "./pages/SelectOrganisations";
import DeceasedInformation from "./layout/DeceasedInformation";
import YourInformation from "./layout/YourInformation";

import DeceasedContactInformation from "./pages/DeceasedContactInformation";
import DeceasedResidentialAddress from "./pages/DeceasedResidentialAddress";
import DeceasedPersonalDetails from "./pages/DeceasedPersonalDetails";
import DeceasedAdditionalInfo from "./pages/DeceasedAdditionalInfo";
import DeceasedImportantDetails from "./pages/DeceasedImportantDetails";

import YourContactInformation from "./pages/YourContactInformation";
import YourPersonalDetails from "./pages/YourPersonalDetails";
import YourRoleInformation from "./pages/YourRoleInformation";
import Loading from "./components/Loading";
import { LoadScript } from "@react-google-maps/api";
import ConfirmAndNotidy from "./layout/ConfirmAndNotify";
import ConfirmSelectedOrganisations from "./pages/ConfirmSelectedOrganisations";
import ConfirmDeceasedInformation from "./pages/ConfirmDeceasedInformation";
import ConfirmYourInformation from "./pages/ConfirmYourInformation";
import DownloadEmails from "./pages/DownloadEmails";
import SignDocument from "./pages/SignDocument";
import { StatusProvider } from "./statusContext";


export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <ThemeProvider theme={theme}>
        <StatusProvider>
          <OrganisationsProvider>
            {isLoading ? (
              <div>
                <Loading />
              </div>
            ) : null}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<FormLayout />}>
                <Route
                  path="selectOrganisations"
                  element={<SelectOrganisations />}
                />
                <Route
                  path="deceasedInformation"
                  element={<DeceasedInformation />}
                >
                  <Route
                    path="deceasedContactInformation"
                    element={<DeceasedContactInformation />}
                  />
                  <Route
                    path="deceasedResidentialAddress"
                    element={<DeceasedResidentialAddress />}
                  />
                  <Route
                    path="deceasedPersonalDetails"
                    element={<DeceasedPersonalDetails />}
                  />
                  <Route
                    path="deceasedImportantDetails"
                    element={<DeceasedImportantDetails />}
                  />
                  <Route
                    path="deceasedAdditionalInfo"
                    element={<DeceasedAdditionalInfo />}
                  />
                </Route>
                <Route path="yourInformation" element={<YourInformation />}>
                  <Route
                    path="yourPersonalDetails"
                    element={<YourPersonalDetails />}
                  />
                  <Route
                    path="yourContactInformation"
                    element={<YourContactInformation />}
                  />
                  <Route
                    path="yourRoleInformation"
                    element={<YourRoleInformation />}
                  />
                </Route>
                <Route path="confirm&notify" element={<ConfirmAndNotidy />}>
                  <Route
                    path="confirmSelectedOrganisations"
                    element={<ConfirmSelectedOrganisations />}
                  />
                  <Route
                    path="confirmDeceasedInformation"
                    element={<ConfirmDeceasedInformation />}
                  />
                  <Route
                    path="confirmYourInformation"
                    element={<ConfirmYourInformation />}
                  />
                </Route>
                <Route path="downloadEmails" element={<DownloadEmails />} />
                <Route path="sign" element={<SignDocument />} />
              </Route>
            </Routes>
          </OrganisationsProvider>
        </StatusProvider>
      </ThemeProvider>
    </LoadScript>
  );
}
