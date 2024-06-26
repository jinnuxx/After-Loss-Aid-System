import React, { createContext, useContext, useState, useEffect } from "react";

import CommonwealthBankLogo from "./images/CommonwealthBank.png";
import WestpacLogo from "./images/Westpac.png";
import NationalAustraliaLogo from "./images/NationalAustraliaBank.png";
import AustraliaandNZLogo from "./images/AustraliaNZBank.png";
import AustralianSuperLogo from "./images/AustralianSuper.png";
import AwareSuperLogo from "./images/AwareSuper.png";
import UniSuperLogo from "./images/Unisuper.png";
import AustralianRetirementTrustLogo from "./images/AustralianRetirementTrust.png";
import IAGLogo from "./images/Iag.png";
import SuncorpLogo from "./images/Suncorp.png";
import QBEInsuranceLogo from "./images/QbeInsurance.png";
import FacebookLogo from "./images/Facebook.png";
import OptusLogo from "./images/Optus.png";
import TPGLogo from "./images/TPG.png";
import AGLLogo from "./images/AGL.png";
import EGAustraliaLogo from "./images/EG.png";
import OriginLogo from "./images/Origin.png";
import TelstraLogo from "./images/Telstra.png";
import BHPLogo from "./images/BHPBilliton.png";
import SydneyWaterLogo from "./images/SydneyWater.png";
import InstagramLogo from "./images/Instagram.png";
import NetflixLogo from "./images/Netflix.png";
import UniversalLogo from "./images/Universal.png";
const OrganisationsContext = createContext();

export function OrganisationsProvider({ children }) {


  const [selectedOrganisations, setSelectedOrganisations] = useState(() => {
    const localData = sessionStorage.getItem("selectedOrganisations");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    sessionStorage.setItem(
      "selectedOrganisations",
      JSON.stringify(selectedOrganisations)
    );
  }, [selectedOrganisations]);

  const addOrganisation = (org) => {
    setSelectedOrganisations((prev) => [...prev, org]);
  };

  const removeOrganisation = (orgName) => {
    setSelectedOrganisations((prev) =>
      prev.filter((org) => org.name !== orgName)
    );
  };

  const clearOrganisations = () => {
    setSelectedOrganisations([]);
  };

  const updatedSelectedOrganisations = selectedOrganisations.map((org) => {
    switch (org.name) {
      case "Commonwealth Bank":
        org.logo = CommonwealthBankLogo;
        org.categories = "Banks";
        break;
      case "Westpac":
        org.logo = WestpacLogo;
        org.categories = "Banks";
        break;
      case "National Australia Bank":
        org.logo = NationalAustraliaLogo;
        org.categories = "Banks";
        break;
      case "Australia and NZ Bank":
        org.logo = AustraliaandNZLogo;
        org.categories = "Banks";
        break;
      case "Australian Super":
        org.logo = AustralianSuperLogo;
        org.categories = "Superannuation";
        break;
      case "Aware Super":
        org.logo = AwareSuperLogo;
        org.categories = "Superannuation";
        break;
      case "UniSuper":
        org.logo = UniSuperLogo;
        org.categories = "Superannuation";
        break;
      case "Australian Retirement Trust":
        org.logo = AustralianRetirementTrustLogo;
        org.categories = "Superannuation";
        break;
      case "IAG ":
        org.logo = IAGLogo;
        org.category = "Shares";
        break;
      case "Telstra ":
        org.logo = TelstraLogo;
        org.category = "Shares";
        break;
      case "Suncorp":
        org.logo = SuncorpLogo;
        org.category = "Insurance";
        break;
      case "QBE Insurance":
        org.logo = QBEInsuranceLogo;
        org.category = "Insurance";
        break;
      case "Facebook":
        org.logo = FacebookLogo;
        org.category = "Social Media";
        break;
      case "Telstra":
        org.logo = TelstraLogo;
        org.category = "Telecommunications and Internet Services";
        break;
      case "Optus":
        org.logo = OptusLogo;
        org.category = "Telecommunications and Internet Services";
        break;
      case "TPG":
        org.logo = TPGLogo;
        org.category = "Telecommunications and Internet Services";
        break;
      case "BHP Billiton":
        org.logo = BHPLogo;
        org.category = "Shares";
        break;
      case "Netflix":
        org.logo = NetflixLogo;
        org.category = "Subscription";
        break;
      case "AGL":
        org.logo = AGLLogo;
        org.category = "Electricity and Gas";
        break;
      case "EnergyAustralia":
        org.logo = EGAustraliaLogo;
        org.category = "Electricity and Gas";
        break;
      case "Origin":
        org.logo = OriginLogo;
        org.category = "Electricity and Gas";
        break;
      case "Sydney Water":
        org.logo = SydneyWaterLogo;
        org.category = "Water";
        break;
      case "Instagram":
        org.logo = InstagramLogo;
        org.category = "Social Media";
        break;

      default:
        // Default logo if the organization's logo is not specified
        org.logo = UniversalLogo;
        org.category = org.category;
        break;
    }
    return org;
  });

  const [categories_common] = useState({
    Banks: [
      {
        name: "Commonwealth Bank",
        logo: CommonwealthBankLogo,
      },
      { name: "Westpac", logo: WestpacLogo },
      { name: "National Australia Bank", logo: NationalAustraliaLogo },
      { name: "Australia and NZ Bank", logo: AustraliaandNZLogo },
    ],
    Superannuation: [
      { name: "Australian Super", logo: AustralianSuperLogo },
      { name: "Aware Super", logo: AwareSuperLogo },
      { name: "UniSuper", logo: UniSuperLogo },
      {
        name: "Australian Retirement Trust",
        logo: AustralianRetirementTrustLogo,
      },
    ],
    Insurance: [
      { name: "IAG", logo: IAGLogo },
      { name: "Suncorp", logo: SuncorpLogo },
      { name: "QBE Insurance", logo: QBEInsuranceLogo },
    ],
    Shares: [
      { name: "IAG ", logo: IAGLogo },
      { name: "Telstra ", logo: TelstraLogo },
      { name: "BHP Billiton", logo: BHPLogo },
    ],
  });

  const [categories, setCategories] = useState({
    "Common Organisations": [],
    Banks: [...categories_common.Banks],
    Superannuation: [...categories_common.Superannuation],
    Insurance: [...categories_common.Insurance],
    Shares: [...categories_common.Shares],
    "Electricity and Gas": [{ name: "AGL", logo: FacebookLogo }],
    Utilities: [],
    "Social Media": [
      { name: "Instagram", logo: InstagramLogo },
      { name: "Facebook", logo: FacebookLogo },
    ],
    Subscription: [{ name: "Netflix", logo: NetflixLogo }],
    "Telecommunications and Internet Services": [
      { name: "Telstra", logo: TelstraLogo },
      { name: "Optus", logo: OptusLogo },
      { name: "TPG", logo: TPGLogo },
    ],
    "Electricity and Gas": [
      { name: "AGL", logo: AGLLogo },
      { name: "EnergyAustralia", logo: EGAustraliaLogo },
      { name: "Origin", logo: OriginLogo },
    ],
    Water: [{ name: "Sydney Water", logo: SydneyWaterLogo }],
  });

  return (
    <OrganisationsContext.Provider
      value={{
        categories,
        setCategories,
        categories_common,
        selectedOrganisations: updatedSelectedOrganisations,
        addOrganisation,
        removeOrganisation,
        clearOrganisations,
      }}
    >
      {children}
    </OrganisationsContext.Provider>
  );
}

export function useOrganisations() {
  return useContext(OrganisationsContext);
}
