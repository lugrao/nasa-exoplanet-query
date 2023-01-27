import React, { useState, useEffect } from "react"
import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react"
import { Select } from "./Select"

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
    console.log(selection)
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
          label="Host Name"
          value={selection.hostname}
          onChange={(e) => handleSelection("hostname", e.value)}
          options={queryValues ? queryValues.hostNames : null}
        />
      </WrapItem>

      <WrapItem>
        <Select
          label="Discovery Method"
          value={selection.discoverymethod}
          onChange={(e) => handleSelection("discoverymethod", e.value)}
          options={queryValues ? queryValues.discoveryMethods : null}
        />
      </WrapItem>

      <WrapItem>
        <Select
          label="Discovery Year"
          value={selection.disc_year}
          onChange={(e) => handleSelection("disc_year", e.value)}
          options={queryValues ? queryValues.discoveryYears : null}
        />
      </WrapItem>

      <WrapItem>
        <Select
          label="Discovery Facility"
          value={selection.disc_facility}
          onChange={(e) => handleSelection("disc_facility", e.value)}
          options={queryValues ? queryValues.discoveryFacilities : null}
        />
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
