import React from "react"
import Layout from "../components/Layout"
import QueryPanel from "../components/QueryPanel"
import ResultsPanel from "../components/ResultsPanel"

export default function App({ exoplanets }) {
  console.log(exoplanets)
  return (
    <Layout>
      <QueryPanel />
      <ResultsPanel />
    </Layout>
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
