import React from "react"
import { Box, Tooltip } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

export default function SortButtons({ sortResults, field }) {
  return (
    <Box>
      <Tooltip label="Descending order">
        <TriangleDownIcon
          _hover={{ cursor: "pointer" }}
          onClick={() => sortResults(field, "desc")}
        />
      </Tooltip>
      <Tooltip label="Ascending order">
        <TriangleUpIcon
          _hover={{ cursor: "pointer" }}
          onClick={() => sortResults(field, "asc")}
        />
      </Tooltip>
    </Box>
  )
}
