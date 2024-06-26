// tests/index.test.js
import React from "react";
import OrganisationList from "../components/OrganisationsList"
import SelectOrganisations from "../pages/SelectOrganisations.jsx"
import {render} from "@testing-library/react";

describe("test", () => {
    test("equal", () => {
        render(<OrganisationList />)

       // expect(<div />).toEqual(<div />);
    });
});