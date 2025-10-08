import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content="开源社" />
        <meta
          property="og:description"
          content="加入开源社, 立足中国，贡献全球，推动开源成为新时代生活方式"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="开源社" />
        <link rel="icon" href="/logo.png" />
        
        {/* Leaflet CSS - 优先使用国内CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.bootcdn.net/ajax/libs/leaflet/1.9.4/leaflet.css" 
          integrity="sha384-BBQL4gKfA4GLjCgJ8c3VJ0B7+9Z8JkJPnTxDg4g6jKwD+UzFVmgE+pGvqQ+X5Qz2"
          crossOrigin="anonymous"
        />
        {/* 备用CDN */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" 
          as="style"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
