import React from "react";
import { render } from "@testing-library/react";
import Company from "./CompanyDetail";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Company />
        </UserProvider>
      </MemoryRouter>,
  );
});