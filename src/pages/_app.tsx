import Header from '@/components/Header'
import { store } from '@/redux/store'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Coffee Delivery 2.0</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
