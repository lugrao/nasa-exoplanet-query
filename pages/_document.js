import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>NASA Exoplanet Query</title>
          <meta
            nam="description"
            content="Query exoplanets from NASA's database."
          />
          <meta
            name="description"
            content="Web application for querying exoplanets. Data from NASA Exoplanet Archive."
          ></meta>
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
