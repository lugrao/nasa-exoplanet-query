import React, { useState, useEffect } from "react"
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
import {
  ExternalLinkIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons"

export default function QueryPanel({ exoplanets, search }) {
  const [foundResults, setFoundResults] = useState(false)
  const [results, setResults] = useState([])
  const [noResultsMessage, setNoResultsMessage] = useState(false)

  useEffect(() => {
    setFoundResults(false)
    setNoResultsMessage(false)
    if (search) {
      setResults(findResults())
      if (!foundResults) setNoResultsMessage(true)
    }
  }, [search])

  function findResults() {
    return (
      search &&
      exoplanets.map((exoplanet, i) => {
        let match = true
        for (const key in exoplanet) {
          if (search[key] && search[key] !== exoplanet[key]) {
            match = false
            break
          }
        }
        if (match) setFoundResults(true)
        return (
          match && (
            <Tr key={i}>
              <Td>
                <Link
                  color="blue.500"
                  href={
                    `https://exoplanetarchive.ipac.caltech.edu/overview/` +
                    exoplanet.pl_name
                  }
                  isExternal
                >
                  {exoplanet.pl_name} <ExternalLinkIcon mx="2px" />
                </Link>
              </Td>
              <Td>{exoplanet.hostname}</Td>
              <Td>{exoplanet.discoverymethod}</Td>
              <Td isNumeric>{exoplanet.disc_year}</Td>
              <Td>{exoplanet.disc_facility}</Td>
            </Tr>
          )
        )
      })
    )
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
              this
            </Link>{" "}
            table. Yo can read about it{" "}
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
                Planet Name <TriangleDownIcon />
                <TriangleUpIcon />
              </Th>
              <Th>
                Host Name <TriangleDownIcon />
                <TriangleUpIcon />
              </Th>
              <Th>
                Discovery Method <TriangleDownIcon />
                <TriangleUpIcon />
              </Th>
              <Th isNumeric>
                Discovery Year <TriangleDownIcon />
                <TriangleUpIcon />
              </Th>
              <Th>
                Discovery Facility <TriangleDownIcon />
                <TriangleUpIcon />
              </Th>
            </Tr>
          </Thead>
          <Tbody>{results}</Tbody>
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
                NASA's Exoplanet Archive
              </Link>{" "}
              and find the one you love the most.
            </Heading>
          </Box>
        )}
      </VStack>
    )
  )
}
