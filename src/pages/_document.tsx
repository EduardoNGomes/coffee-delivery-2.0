import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="Eduardo Gomes" />
        <meta
          name="description"
          content="Project to test my skills with technology"
        />
        <meta
          name="keywords"
          content="TypeScript, Next, Redux, React-hook-form, Zod, MapQuestApi, ViaCepAPI, Stripe"
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body className="p-2 py-8  max-w-6xl mt-0 mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
