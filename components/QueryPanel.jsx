import React, { useState, useEffect } from "react"
import {
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react"

export default function QueryPanel(props) {
  const [queryValues, setQueryValues] = useState(null)
  const [hostNames, setHostNames] = useState([])
  const [discoveryMethods, setDiscoveryMethods] = useState([])
  const [discoveryYears, setDiscoveryYears] = useState([])
  const [discoveryFacilities, setDiscoveryFacilities] = useState([])
  // const [checkedYears, setCheckedYears] = useState(null)
  // console.log(checkedYears)

  useEffect(() => {
    setQueryValues({
      hostNames: props.queryValues.hostNames,
      discoveryMethods: props.queryValues.discoveryMethods,
      discoveryFacilities: props.queryValues.discoveryFacilities,
      discoveryYears: props.queryValues.discoveryYears,
    })
  }, [props.queryValues])

  // useEffect(() => {
  //   if (queryValues)
  //     setCheckedYears(new Array(queryValues.discoveryYears.length).fill(false))
  // }, [queryValues])

  const handleCheck = {
    hostName: (e) => {
      if (e.target.checked) hostNames.push(e.target.value)
      else hostNames.splice(hostNames.indexOf(e.target.value), 1)
      setHostNames(hostNames)
    },
    discoveryMethod: (e) => {
      if (e.target.checked) discoveryMethods.push(e.target.value)
      else discoveryMethods.splice(discoveryMethods.indexOf(e.target.value), 1)
      setDiscoveryMethods(discoveryMethods)
    },
    discoveryYear: (e, i) => {
      // if (!checkedYears[i]) {
      //   discoveryYears.push(e.target.value)
      //   console.log(checkedYears)
      //   let temp = checkedYears
      //   temp[i] = true
      //   setCheckedYears(temp)
      //   console.log(checkedYears)
      // } else {
      //   discoveryYears.splice(discoveryYears.indexOf(e.target.value), 1)
      //   console.log(checkedYears)
      //   let temp = checkedYears
      //   temp[i] = false
      //   setCheckedYears(temp)
      //   console.log(checkedYears)
      // }
      // setDiscoveryYears(discoveryYears)
      if (e.target.checked) discoveryYears.push(e.target.value)
      else discoveryYears.splice(discoveryYears.indexOf(e.target.value), 1)
      setDiscoveryYears(discoveryYears)
    },
    discoveryFacility: (e) => {
      if (e.target.checked) discoveryFacilities.push(e.target.value)
      else
        discoveryFacilities.splice(
          discoveryFacilities.indexOf(e.target.value),
          1
        )
      setDiscoveryFacilities(discoveryFacilities)
    },
  }

  function handleSearch() {
    props.updateUserSearch({
      hostNames: hostNames,
      discoveryMethods: discoveryMethods,
      discoveryYears: discoveryYears,
      discoveryFacilities: discoveryFacilities,
    })
  }

  function handleClear() {
    props.updateUserSearch(null)
  }

  return (
    <Container
      maxW="container.xl"
      border="1px solid #e8e8e8"
      borderRadius="7px"
      p="0 13px 13px"
    >
      <Stack direction="row" align="start">
        <Accordion allowToggle width="400px">
          <AccordionItem border="none">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Host Name
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack direction="column">
                {queryValues &&
                  queryValues.hostNames.map((host, i) => (
                    <Checkbox
                      key={i}
                      value={host}
                      onChange={handleCheck.hostName}
                    >
                      {host}
                    </Checkbox>
                  ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Discovery Method
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack direction="column">
                {queryValues &&
                  queryValues.discoveryMethods.map((method, i) => (
                    <Checkbox
                      key={i}
                      value={method}
                      onChange={handleCheck.discoveryMethod}
                    >
                      {method}
                    </Checkbox>
                  ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Discovery Year
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack direction="column">
                {queryValues &&
                  queryValues.discoveryYears.map((year, i) => {
                    {
                      /* console.log(checkedYears[i]) */
                    }
                    return (
                      <Checkbox
                        key={i}
                        value={year}
                        // isChecked={checkedYears[i]}
                        onChange={(e) => handleCheck.discoveryYear(e, i)}
                      >
                        {year}
                      </Checkbox>
                    )
                  })}
              </Stack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Discovery Facility
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack direction="column">
                {queryValues &&
                  queryValues.discoveryFacilities.map((facility, i) => (
                    <Checkbox
                      key={i}
                      value={facility}
                      onChange={handleCheck.discoveryFacility}
                    >
                      {facility}
                    </Checkbox>
                  ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Stack direction="row" pt="10px" justify="end">
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
        <Button colorScheme="blue" onClick={handleClear}>
          Clear
        </Button>
      </Stack>
    </Container>
  )
}
