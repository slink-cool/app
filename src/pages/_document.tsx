import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="bg-dark-500">
      <Head>
        <meta
          property="og:title"
          content="Slink"
          key="title"
        />
        <meta
          property="og:description"
          content="Talent platform for web3 professionals"
          key="description"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
