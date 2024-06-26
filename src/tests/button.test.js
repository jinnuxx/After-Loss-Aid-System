import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NextStep from "../components/Nextstep"
import SelectOrganisations from "../pages/SelectOrganisations.jsx"
import DeceasedPersonalDetails from "../pages/DeceasedPersonalDetails.jsx"
import App from "../App.js"

describe("test", () => {
    test("button link", () => {
        //expect(<div />).toEqual(<div />);
        render(
            <MemoryRouter initialEntries={['/form']}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/selectOrganisations" element={<SelectOrganisations  />} />
                </Routes>
            </MemoryRouter>
        );

        const button = screen.getByRole('NextStep');
        fireEvent.click(button);

        const page2Text = screen.getByText('LinkJump is success');
        expect(page2Text).toBeInTheDocument();

    });
});