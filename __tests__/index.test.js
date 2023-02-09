import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../pages/index"
import exoplanetsData from "./data/exoplanets.json"
import userEvent from "@testing-library/user-event"

import { within } from "@testing-library/dom"

beforeEach(() => {
  checkIfExoplanetIsWithinTable(null)
})

function checkIfExoplanetIsWithinTable(exoplanet, table) {
  if (exoplanet === null) return
  for (const key in exoplanet) {
    expect(
      within(table).getAllByRole("cell", { name: exoplanet[key] })[0]
    ).toBeInTheDocument()
  }
}

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

test("clicking Search after selecting a Discovery Year shows a table with results", async () => {
  render(<App exoplanets={exoplanetsData} />)

  const years = new Set()
  exoplanetsData.forEach((exoplanet) => years.add(exoplanet.disc_year))
  const discoveryYears = [...years].sort()
  const user = userEvent.setup()
  const selectedDiscoveryYear = discoveryYears[1]
  const exoplanet = exoplanetsData.find(
    (exoplanet) => exoplanet.disc_year === selectedDiscoveryYear
  )
  const discoveryYearSelect = screen.getByText("Discovery Year")
  const searchButton = screen.getByRole("button", { name: /search/i })

  expect(screen.queryByText(selectedDiscoveryYear)).not.toBeInTheDocument()

  await user.click(discoveryYearSelect)

  expect(screen.getByText(selectedDiscoveryYear)).toBeInTheDocument()

  fireEvent.click(screen.getByText(selectedDiscoveryYear))

  expect(screen.getByText(selectedDiscoveryYear)).toBeInTheDocument()

  await user.click(searchButton)

  const table = screen.getByRole("table")

  expect(table).toBeInTheDocument()
  checkIfExoplanetIsWithinTable(exoplanet, table)
})

test("clicking Search after selecting a Discovery Facility shows a table with results", async () => {
  render(<App exoplanets={exoplanetsData} />)

  const facilities = new Set()
  exoplanetsData.forEach((exoplanet) => facilities.add(exoplanet.disc_facility))
  const discoveryFacilities = [...facilities].sort()
  const user = userEvent.setup()
  const selectedDiscoveryFacility = discoveryFacilities[3]
  const exoplanet = exoplanetsData.find(
    (exoplanet) => exoplanet.disc_facility === selectedDiscoveryFacility
  )
  const discoveryFacilitySelect = screen.getByText("Discovery Facility")
  const searchButton = screen.getByRole("button", { name: /search/i })

  expect(screen.queryByText(selectedDiscoveryFacility)).not.toBeInTheDocument()

  await user.click(discoveryFacilitySelect)

  expect(screen.getByText(selectedDiscoveryFacility)).toBeInTheDocument()

  fireEvent.click(screen.getByText(selectedDiscoveryFacility))

  expect(screen.getByText(selectedDiscoveryFacility)).toBeInTheDocument()

  await user.click(searchButton)

  const table = screen.getByRole("table")

  expect(table).toBeInTheDocument()
  checkIfExoplanetIsWithinTable(exoplanet, table)
})
