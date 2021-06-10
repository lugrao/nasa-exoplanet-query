import React from "react"
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

export default function QueryPanel({ exoplanets, search }) {
  return (
      <Table variant="simple" mt="40px">
        <TableCaption>Exoplanets</TableCaption>
        <Thead>
          <Tr>
            <Th>Planet Name</Th>
            <Th>Host Name</Th>
            <Th>Discovery Method</Th>
            <Th isNumeric>Discovery Year</Th>
            <Th>Discovery Facility</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exoplanets &&
            search &&
            exoplanets.map((exoplanet, i) => {
              let match = true
              for (const key in exoplanet) {
                if (search[key] && search[key] !== exoplanet[key]) {
                  match = false
                  break
                }
              }
              return (
                match && (
                  <Tr key={i}>
                    <Td>
                      <Link
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
            })}
        </Tbody>
      </Table>
  )
}
