import Header from '@/components/Header'
import { store } from '@/redux/store'
import '@/styles/globals.css'

// eslint-disable-next-line
import { Fira_Code } from 'next/font/google'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

// eslint-disable-next-line no-redeclare
const FiraCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-Fira_Code ',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${FiraCode.variable} font-sans`}>
      <Provider store={store}>
        <Head>
          <title>Coffee Delivery 2.0</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}
