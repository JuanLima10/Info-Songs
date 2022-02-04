import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../../styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Info Songs</title>
        </Head>
      <Component {...pageProps} />
    </>
  )
}
