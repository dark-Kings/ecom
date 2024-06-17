import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
          
        <Script type='application/javascript' crossOrigin='anonymous' src={`${process
        .env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} /> */}
     
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}