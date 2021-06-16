import React from "react"
import { Tooltip } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"

export default function SortButtons({ sortResults, field }) {
  return (
    <>
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
    </>
  )
}
