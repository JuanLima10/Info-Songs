/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="imagem/png" href="/img/logoIcon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/5fb634a247.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument