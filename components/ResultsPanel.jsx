import React, { useState, useEffect, useCallback } from "react"
import { Box, Heading, Link, VStack } from "@chakra-ui/react"
import { Table } from "./Table"

export default function QueryPanel({ exoplanets, search }) {
  const [foundResults, setFoundResults] = useState(false)
  const [results, setResults] = useState([])
  const [noResultsMessage, setNoResultsMessage] = useState(false)
  const findResults = useCallback(
    () =>
      search &&
      exoplanets.filter((exoplanet) => {
        let match = true
        for (const key in exoplanet) {
          if (search[key] && search[key] !== exoplanet[key]) {
            match = false
            break
          }
        }
        if (match) setFoundResults(true)
        return match
      }),
    [exoplanets, search]
  )

  useEffect(() => {
    setFoundResults(false)
    setNoResultsMessage(false)
    if (search) {
      setResults(findResults())
      if (!foundResults) setNoResultsMessage(true)
    }
  }, [foundResults, search, findResults])

  function sortResults(field, order) {
    setResults([
      ...results.sort((a, b) => {
        if (order === "desc") return a[field] > b[field] ? -1 : 1
        return a[field] > b[field] ? 1 : -1
      }),
    ])
  }

  return (
    (search && foundResults && (
      <Box overflow="auto">
        <Table sortResults={sortResults} results={results} />
      </Box>
    )) || (
      <VStack h="100%" justify="center" pb="70px">
        {(search && noResultsMessage && (
          <Heading
            as="h2"
            size="md"
            m="10px"
            textAlign="center"
            color="yellow.600"
          >
            No results matching this query.
          </Heading>
        )) || (
          <Box>
            <Heading as="h2" size="md" m="10px" textAlign="center">
              Exoplanets are planets outside the Solar System.
            </Heading>
            <Heading as="h2" size="md" m="10px" textAlign="center">
              Here you can query{" "}
              <Link
                href="https://exoplanetarchive.ipac.caltech.edu/"
                color="blue.600"
                isExternal
              >
                NASA&apos;s Exoplanet Archive
              </Link>{" "}
              and find the one you love the most.
            </Heading>
          </Box>
        )}
      </VStack>
    )
  )
}
