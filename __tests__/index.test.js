import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../pages/index"

test("renders the App and all its basic components", () => {
  render(<App exoplanets={[]} />)

  const heading = screen.getByRole("heading", { name: /NASA Exoplanet Query/i })
  const hostNameSelect = screen.getByText("Host Name")
  const discoveryMethodSelect = screen.getByText("Discovery Method")
  const discoveryYearSelect = screen.getByText("Discovery Year")
  const discoveryFacilitySelect = screen.getByText("Discovery Facility")
  const searchButton = screen.getByRole("button", { name: /search/i })
  const clearButton = screen.getByRole("button", { name: /clear/i })

  expect(heading).toBeInTheDocument()
  expect(hostNameSelect).toBeInTheDocument()
  expect(discoveryMethodSelect).toBeInTheDocument()
  expect(discoveryYearSelect).toBeInTheDocument()
  expect(discoveryFacilitySelect).toBeInTheDocument()
  expect(searchButton).toBeInTheDocument()
  expect(clearButton).toBeInTheDocument()
})
