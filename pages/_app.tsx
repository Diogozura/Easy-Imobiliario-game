import Head from 'next/head'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { DefaultSeo, NextSeo, SocialProfileJsonLd } from 'next-seo';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// config.autoAddCss = false
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';
import React from 'react';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Museo300";
  src: url("/fonts/Museo300/Museo300-Regular.otf");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
      
}
@font-face {
  font-family: "Museo700";
  src: url("/fonts/Museo700/Museo700-Regular.otf");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

html{
  scroll-behavior: smooth;
}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image:url('/image/fundo.png') ;
  }
  *{
    font-family: 'Museo300';
    
  }
`

export const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#737176',
    button: '#22192C',
  },
}



export default function App({ Component, pageProps }) {


  Network.addListener('networkStatusChange', status => {
    console.log('Network status changed', status);
  });

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    await Toast.show({
      text: `Hello! ${status.connected}`,
    });

    return status.connected
  };
  const showHelloToast = async () => {
    await Toast.show({
      text: `Hello! ${status}`,
    });
  };

  React.useEffect(() => {

    logCurrentNetworkStatus()
  }, [])

  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name="Easy Bank Imobiliário"
        url="https://www.easyimobiliario.com.br"
        sameAs={[
          'https://www.instagram.com/easybankgame/',
        ]}
      />

      <Head>

        <link rel="canonical" href="https://www.easyimobiliario.com.br" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msvalidate.01" content="991BF21876522D88EACC46BCD2D994D1" />
        <meta name="monetag" content="7078ea9dcf38e00b68d3d3a6329e4c3b" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4JHHYSLB83"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-4JHHYSLB83');
            `

          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-4JHHYSLB83');
            `

          }}
        />

<script src="//" data-cfasync="false" async />

<script src="https://itweepinbelltor.com/pfe/current/tag.min.js?z=5720831" data-cfasync="false" async />
      </Head>

      <ToastContainer />
      <GlobalStyle />
      <ThemeProvider theme={theme}>

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}