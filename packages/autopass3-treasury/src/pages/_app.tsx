import type { AppProps } from "next/app";

import GlobalStyle from "@/styles/GlobalStyles";

import localFont from "next/font/local";
import Layout from "@/components/Layout";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  gnosisChiado,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import env_var from "@/utils/env_var";

const { chains, provider } = configureChains(
  [gnosisChiado, goerli],
  [alchemyProvider({ apiKey: env_var.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Autopass3 - Treasury",
  projectId: "Autopass3 - Treasury",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

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
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
