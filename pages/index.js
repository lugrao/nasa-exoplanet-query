import React, { useState, useEffect } from "react"
import QueryPanel from "../components/QueryPanel"
import ResultsPanel from "../components/ResultsPanel"
import { Heading } from "@chakra-ui/react"

export default function App({ exoplanets }) {
  const [userSearch, setUserSearch] = useState(null)
  const [queryValues, setQueryValues] = useState({
    hostNames: [],
    discoveryMethods: [],
    discoveryFacilities: [],
    discoveryYears: [],
  })

  useEffect(() => {
    const hosts = new Set()
    const methods = new Set()
    const facilities = new Set()
    const years = new Set()
    exoplanets.forEach((exoplanet) => {
      hosts.add(exoplanet.hostname)
      methods.add(exoplanet.discoverymethod)
      facilities.add(exoplanet.disc_facility)
      years.add(exoplanet.disc_year)
    })
    setQueryValues({
      hostNames: [...hosts].sort(),
      discoveryMethods: [...methods].sort(),
      discoveryFacilities: [...facilities].sort(),
      discoveryYears: [...years].sort(),
    })
  }, [])

  function updateUserSearch(newSearch) {
    setUserSearch(newSearch)
  }

  return (
    <>
      <Heading as="h1" size="lg" textAlign="center" mt="50px">
        NASA Exoplanet Query
      </Heading>
      <QueryPanel
        queryValues={queryValues}
        updateUserSearch={updateUserSearch}
      />
      <ResultsPanel exoplanets={exoplanets} search={userSearch} />
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year,disc_facility+from+pscomppars&format=json"
  )
  const exoplanets = await res.json()
  return {
    props: { exoplanets },
  }
}
