<script lang="ts">
  import "@fontsource/poppins/700.css"; // Defaults to weight 400.
  import "@fontsource/poppins/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/700.css"; // Defaults to weight 400.
  import WalletConnect from "../components/Web3/WalletConnect.svelte";

  import TopNavBar from "../components/TopNavBar/TopNavBar.svelte";
  import { onMount } from "svelte";
  import BottomNav from "../components/BottomNav/BottomNav.svelte";
  import MaxWidthContainer from "../components/Container/MaxWidthContainer.svelte";

  import { watchAutopassPaymentGatewayEvent } from "../generated";
  import { wagmiClient } from "../stores";
  import type { Payment } from "../types";
  import { parseEther } from "ethers/lib/utils.js";
  import { orders } from "../stores";
  import { getNetwork } from "@wagmi/core";
  import BackgroundImage from "../public/images/background.svg";

  // Listen for PaymentReceived Events
  wagmiClient.subscribe((client) => {
    if (client) {
      let { chain } = getNetwork();
      console.log("🚀 | wagmiClient.subscribeee | chain:", chain);
      if (chain) {
        // Only Start Listening WHen Client is Ready
        watchAutopassPaymentGatewayEvent(
          { eventName: "PaymentReceived", chainId: chain.id as 31337 },
          async (sender, amount, orderId, paymentId, data) => {
            console.log({
              sender,
              amount: amount.toString(),
              orderId,
              paymentId: paymentId.toString(),
              data,
            });

            // Update backend
            // POST api/payment
            let payment: Payment = {
              userAddress: sender,
              orderId: orderId,
              amount: amount,
            };
            const response = await fetch("/api/payment", {
              method: "POST",
              body: JSON.stringify(payment),
              headers: {
                "content-type": "application/json",
              },
            });

            // get orders and update store
            const getResponse = await fetch("/api/order", {
              method: "GET",
              headers: {
                "content-type": "application/json",
              },
            });
            let _orders = await getResponse.json();
            console.log("🚀 | handleClick | _orders:", _orders);
            let _ordersKeys = Object.keys(_orders);
            $orders = _ordersKeys.map((key) => _orders[key]);
          }
        );
      }
    }
  });
</script>

<!-- Comment to Disable WEB3 (Requires VITE_WEB3MODAL_PROJECT_ID to work) -->
<WalletConnect />

<div class="background">
  <img src={BackgroundImage} alt="background"/>
</div>

<div class="content">
  <header>
    <TopNavBar />
  </header>
  
  <!-- Header -->
  
  <main>
    <MaxWidthContainer>
      <slot />
    </MaxWidthContainer>
  </main>
  
  <footer />
  
  <BottomNav />
</div>

<style lang="scss">
  @import "../styles/breakpoints";

  .background {
    position: fixed;
    top: 0;
    left: 0;
  }

  .background img {
    width: 150vw;

    @media screen and (min-width: $large) {
      width: 100vw;
    }
  }
  
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  :global(body) {
    /* background-color: #fffa00; */
    overflow-x: hidden;
  }

  @font-face {
    font-family: "Figtree";
    src: url("../public/fonts/Figtree/Figtree-VariableFont_wght.ttf");
  }

  header {
    background: transparent;
    font-family: "Figtree";
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    font-family: "Figtree";
    background: transparent;
    color: #000000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
  }

  footer {
    height: 100px;
  }
</style>
