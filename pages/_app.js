import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>NASA Exoplanet Query</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
