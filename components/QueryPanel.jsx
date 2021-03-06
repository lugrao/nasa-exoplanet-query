import React, { useState, useEffect } from "react"
import { Select, Button, useToast, Wrap, WrapItem } from "@chakra-ui/react"

export default function QueryPanel(props) {
  const toast = useToast()
  const [queryValues, setQueryValues] = useState(null)
  const [selection, setSelection] = useState({
    hostname: "",
    discoverymethod: "",
    disc_year: "",
    disc_facility: "",
  })

  useEffect(() => {
    setQueryValues({
      hostNames: props.queryValues.hostNames,
      discoveryMethods: props.queryValues.discoveryMethods,
      discoveryFacilities: props.queryValues.discoveryFacilities,
      discoveryYears: props.queryValues.discoveryYears,
    })
  }, [props.queryValues])

  function handleSelection(field, value) {
    setSelection({ ...selection, [field]: value })
    props.updateQueryValues(
      Object.values({ ...selection, [field]: value }).filter((i) => Boolean(i))
    )
  }

  function handleSearch() {
    let selectionValues = Object.values(selection).join("")
    if (selectionValues === "0" || selectionValues === "")
      return toast({
        title: "You must select something",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    props.updateUserSearch(selection)
  }

  function handleClear() {
    const clearedSelection = {}
    for (const key in selection) clearedSelection[key] = ""
    setSelection(clearedSelection)
    props.updateUserSearch(null)
    props.updateQueryValues(null)
  }

  return (
    <Wrap align="center" justify="center" mt="10px" pb="40px">
      <WrapItem>
        <Select
          w="250px"
          placeholder="Host Name"
          value={selection.hostname}
          onChange={(e) => handleSelection("hostname", e.target.value)}
        >
          {queryValues &&
            queryValues.hostNames.map((host, i) => (
              <option key={i} value={host}>
                {host}
              </option>
            ))}
        </Select>
      </WrapItem>

      <WrapItem>
        <Select
          w="250px"
          placeholder="Discovery Method"
          value={selection.discoverymethod}
          onChange={(e) => handleSelection("discoverymethod", e.target.value)}
        >
          {queryValues &&
            queryValues.discoveryMethods.map((method, i) => (
              <option key={i} value={method}>
                {method}
              </option>
            ))}
        </Select>
      </WrapItem>

      <WrapItem>
        <Select
          w="250px"
          placeholder="Discovery Year"
          value={selection.disc_year}
          onChange={(e) => handleSelection("disc_year", Number(e.target.value))}
        >
          {queryValues &&
            queryValues.discoveryYears.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
        </Select>
      </WrapItem>

      <WrapItem>
        <Select
          w="250px"
          placeholder="Discovery Facility"
          value={selection.disc_facility}
          onChange={(e) => handleSelection("disc_facility", e.target.value)}
        >
          {queryValues &&
            queryValues.discoveryFacilities.map((facility, i) => (
              <option key={i} value={facility}>
                {facility}
              </option>
            ))}
        </Select>
      </WrapItem>

      <WrapItem justifySelf="center">
        <Button colorScheme="facebook" onClick={handleSearch} size="sm" mx={2}>
          Search
        </Button>

        <Button colorScheme="facebook" onClick={handleClear} size="sm" mx={2}>
          Clear
        </Button>
      </WrapItem>
    </Wrap>
  )
}
