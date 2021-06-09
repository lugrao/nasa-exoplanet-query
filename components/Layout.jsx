import Head from "next/head"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>NASA Exoplanet Query</title>
        <meta
          nam="description"
          content="Query exoplanets from NASA's database."
        />
      </Head>
      <main id="main">{children}</main>
    </>
  )
}
