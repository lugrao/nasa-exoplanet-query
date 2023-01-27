import React, { useState, useEffect } from "react"
import SortButtons from "../components/SortButtons"
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  VStack,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

export default function QueryPanel({ exoplanets, search }) {
  const [foundResults, setFoundResults] = useState(false)
  const [results, setResults] = useState([])
  const [noResultsMessage, setNoResultsMessage] = useState(false)

  useEffect(() => {
    setFoundResults(false)
    setNoResultsMessage(false)
    if (search) {
      setResults(findResults())
      console.log(results) ////////////////
      if (!foundResults) setNoResultsMessage(true)
    }
  }, [search])

  function findResults() {
    return (
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
      })
    )
  }

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
        <Table variant="simple">
          <TableCaption>
            Data collected from{" "}
            <Link
              color="blue.500"
              href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars"
              isExternal
            >
              this table
            </Link>
            . Yo can read about it{" "}
            <Link
              color="blue.500"
              href="https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html"
              isExternal
            >
              here
            </Link>
            .
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                Planet Name{" "}
                <SortButtons field={"pl_name"} sortResults={sortResults} />
              </Th>
              <Th>
                Host Name{" "}
                <SortButtons field={"hostname"} sortResults={sortResults} />
              </Th>
              <Th>
                Discovery Method{" "}
                <SortButtons
                  field={"discoverymethod"}
                  sortResults={sortResults}
                />
              </Th>
              <Th>
                Discovery Year{" "}
                <SortButtons field={"disc_year"} sortResults={sortResults} />
              </Th>
              <Th>
                Discovery Facility{" "}
                <SortButtons
                  field={"disc_facility"}
                  sortResults={sortResults}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((result, i) => (
              <Tr key={i}>
                <Td>
                  <Link
                    color="blue.500"
                    href={
                      `https://exoplanetarchive.ipac.caltech.edu/overview/` +
                      result.pl_name
                    }
                    isExternal
                  >
                    {result.pl_name} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Td>
                <Td>{result.hostname}</Td>
                <Td>{result.discoverymethod}</Td>
                <Td>{result.disc_year}</Td>
                <Td>{result.disc_facility}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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
