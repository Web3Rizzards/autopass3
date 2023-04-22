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

  // Listen for PaymentReceived Events
  wagmiClient.subscribe((client) => {
    if (client) {
      console.log("Client is ready");
      let { chain, chains } = getNetwork();
      console.log("🚀 | wagmiClient.subscribe | chains:", chains);
      console.log("🚀 | wagmiClient.subscribe | chain:", chain);

      // Only Start Listening WHen Client is Ready
      watchAutopassPaymentGatewayEvent(
        { eventName: "PaymentReceived" },
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
  });

  onMount(async () => {});
</script>

<!-- Comment to Disable WEB3 (Requires VITE_WEB3MODAL_PROJECT_ID to work) -->
<WalletConnect />

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

<style>
  :global(body) {
    background-color: #fffa00;
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
