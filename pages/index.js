import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import QueryPanel from "../components/QueryPanel"
import ResultsPanel from "../components/ResultsPanel"
import { Heading } from "@chakra-ui/react"

export default function App({ exoplanets }) {
  const [hostNames, setHostNames] = useState([])
  const [discoveryMethods, setDiscoveryMethods] = useState([])
  const [discoveryFacilities, setDiscoveryFacilities] = useState([])
  const [discoveryYears, setDiscoveryYears] = useState([])
  const [userSearch, setUserSearch] = useState(null)

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
    setHostNames([...hosts].sort())
    setDiscoveryMethods([...methods].sort())
    setDiscoveryFacilities([...facilities].sort())
    setDiscoveryYears([...years].sort())
  }, [])

  function updateUserSearch(newSearch) {
    setUserSearch(newSearch)
  }

  return (
    <Layout>
      <Heading size="lg" textAlign="center" mt="50px">NASA Exoplanet Query</Heading>
      <QueryPanel
        queryValues={{
          hostNames: hostNames,
          discoveryMethods: discoveryMethods,
          discoveryFacilities: discoveryFacilities,
          discoveryYears: discoveryYears,
        }}
        updateUserSearch={updateUserSearch}
      />
      <ResultsPanel exoplanets={exoplanets} search={userSearch} />
    </Layout>
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
