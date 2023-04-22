import type { AppProps } from "next/app";

import GlobalStyle from "@/styles/GlobalStyles";

import localFont from "next/font/local";
import Layout from "@/components/Layout";
import { Web3AuthProvider } from "@/context/Web3Auth";

const sfPro = localFont({
  src: [
    {
      path: "../assets/fonts/SF-Pro-Rounded-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/SF-Pro-Rounded-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/SF-Pro-Rounded-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/SF-Pro-Rounded-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../assets/fonts/SF-Pro-Rounded-Black.otf",
      weight: "900",
      style: "bold",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${sfPro.style.fontFamily} !important;
        }
      `}</style>
      <Web3AuthProvider>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </Web3AuthProvider>
    </>
  );
}
