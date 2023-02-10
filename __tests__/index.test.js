import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../pages/index"
import exoplanetsData from "./data/exoplanets.json"
import userEvent from "@testing-library/user-event"
import { within } from "@testing-library/dom"

async function testSelection(category, indexOfOption) {
  const categories = {
    "Host Name": "hostname",
    "Discovery Method": "discoverymethod",
    "Discovery Year": "disc_year",
    "Discovery Facility": "disc_facility",
  }

  if (!categories[category]) {
    throw new Error(
      'Valid arguments of `testSelection()` are "Host Name", "Discovery Method", "Discovery Year", and "Discovery Facility".'
    )
  }

  render(<App exoplanets={exoplanetsData} />)

  const items = new Set()
  exoplanetsData.forEach((exoplanet) =>
    items.add(exoplanet[categories[category]])
  )
  const options = [...items].sort()
  const user = userEvent.setup()
  const selectedOption = options[indexOfOption]
  const exoplanet = exoplanetsData.find(
    (exoplanet) => exoplanet[categories.category] === selectedOption
  )
  const categorySelect = screen.getByText(category)
  const searchButton = screen.getByRole("button", { name: /search/i })

  expect(screen.queryByText(selectedOption)).not.toBeInTheDocument()

  await user.click(categorySelect)

  expect(screen.getByText(selectedOption)).toBeInTheDocument()

  fireEvent.click(screen.getByText(selectedOption))

  expect(screen.getByText(selectedOption)).toBeInTheDocument()

  await user.click(searchButton)

  const table = screen.getByRole("table")

  expect(table).toBeInTheDocument()
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

test("clicking Search after selecting a Host Name shows a table with results", async () => {
  await testSelection("Host Name", 5)
})

test("clicking Search after selecting a Discovery Method shows a table with results", async () => {
  await testSelection("Discovery Method", 5)
})

test("clicking Search after selecting a Discovery Year shows a table with results", async () => {
  await testSelection("Discovery Year", 3)
})

test("clicking Search after selecting a Discovery Facility shows a table with results", async () => {
  await testSelection("Discovery Facility", 3)
})

test("clicking Clear removes table with results and reset select buttons", async () => {
  render(<App exoplanets={exoplanetsData} />)

  const user = userEvent.setup()
  const discoveryYearSelect = screen.getByText("Discovery Year")
  const searchButton = screen.getByRole("button", { name: /search/i })
  const clearButton = screen.getByRole("button", { name: /clear/i })

  await user.click(discoveryYearSelect)
  fireEvent.click(screen.getByText("1996"))

  expect(screen.queryByText("Discovery Year")).not.toBeInTheDocument()

  await user.click(searchButton)

  const table = screen.getByRole("table")

  expect(table).toBeInTheDocument()

  await user.click(clearButton)

  expect(discoveryYearSelect).toBeInTheDocument()
  expect(table).not.toBeInTheDocument()
  expect(screen.queryByText("1996")).not.toBeInTheDocument()
})
