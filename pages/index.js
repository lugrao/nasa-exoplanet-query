import React, { useState, useEffect } from "react"
import QueryPanel from "../components/QueryPanel"
import ResultsPanel from "../components/ResultsPanel"
import { Heading, Box, Stack } from "@chakra-ui/react"

export default function App({ exoplanets }) {
  const [userSearch, setUserSearch] = useState(null)
  const [queryValues, setQueryValues] = useState({
    hostNames: [],
    discoveryMethods: [],
    discoveryFacilities: [],
    discoveryYears: [],
  })

  useEffect(() => {
    updateQueryValues(null)
  }, [])

  function updateUserSearch(newSearch) {
    setUserSearch(newSearch)
  }

  function updateQueryValues(values = null) {
    const hosts = new Set()
    const methods = new Set()
    const facilities = new Set()
    const years = new Set()
    exoplanets.forEach((exoplanet) => {
      if (values) {
        let match = 0
        let exoplanetValues = Object.values(exoplanet)
        values.forEach((value) => {
          exoplanetValues.includes(value) && match++
        })
        if (match === values.length) {
          hosts.add(exoplanet.hostname)
          methods.add(exoplanet.discoverymethod)
          facilities.add(exoplanet.disc_facility)
          years.add(exoplanet.disc_year)
        }
      } else {
        hosts.add(exoplanet.hostname)
        methods.add(exoplanet.discoverymethod)
        facilities.add(exoplanet.disc_facility)
        years.add(exoplanet.disc_year)
      }
    })
    setQueryValues({
      hostNames: [...hosts].sort(),
      discoveryMethods: [...methods].sort(),
      discoveryFacilities: [...facilities].sort(),
      discoveryYears: [...years].sort(),
    })
  }

  return (
    <>
      <Box p="20px" backgroundImage="url('/space.jpg')" h="100vh">
        <Heading as="h1" size="lg" align="center" p="15px" color="white">
          NASA Exoplanet Query
        </Heading>
        <Stack bgColor="white" h="80vh" p="30px" borderRadius="15px">
          <QueryPanel
            queryValues={queryValues}
            updateUserSearch={updateUserSearch}
            updateQueryValues={updateQueryValues}
          />
          <ResultsPanel exoplanets={exoplanets} search={userSearch} />
        </Stack>
      </Box>
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
