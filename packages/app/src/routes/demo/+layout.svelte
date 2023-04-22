<script lang="ts">
  import { getNetwork, prepareWriteContract, writeContract } from "@wagmi/core";
  import Button from "../../components/Button/Button.svelte";
  import SignMessageButton from "../../components/Button/SignMessageButton.svelte";
  import SignTypedMessageButton from "../../components/Button/SignTypedMessageButton.svelte";
  import DisplayLine from "../../components/Display/DisplayLine.svelte";
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";
  import { ethereumClient, signature, typedSignature, wagmiClient, web3Modal } from "../../stores";
  import type { Order } from "../../types";
  import {
    autopassPaymentGatewayABI,
    autopassPaymentGatewayAddress,
    prepareWriteAutopassPaymentGateway,
  } from "../../generated";
  import { ethers } from "ethers";
  import { parseEther } from "ethers/lib/utils.js";
  import MenuButton from "../../components/Button/MenuButton.svelte";
  import HorizontalStack from "../../components/Stack/HorizontalStack.svelte";

  import RepairIcon from "../../public/images/tools.svg";
  import ParkingIcon from "../../public/images/parking.svg";
  import FuelIcon from "../../public/images/fuel.svg";

  let txHash: string = "";

  async function handleGetAPI() {
    const response = await fetch("/api/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("GET API");
    console.log(await response.json());
  }
  async function handlePostAPI() {
    console.log("POST API");
    let data: Order = {
      item: "Apple",
      amount: "1",
    };
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    let total = await response.json();
  }
  async function handlePay() {
    let config = await prepareWriteAutopassPaymentGateway({
      functionName: "createPayment",
      args: ["A", "0x"],
      overrides: { value: parseEther("1") },
    });
    const data = await writeContract(config);
    txHash = data.hash;
  }
</script>

<VerticalStack>
  <slot />
</VerticalStack>

<style>
  title {
    width: auto;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 5rem;

    display: flex;
    align-items: center;

    color: #000000;
  }
</style>
