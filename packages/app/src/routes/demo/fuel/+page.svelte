<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../../components/Button/Button.svelte";
  import DisplayGroup from "../../../components/Display/DisplayGroup.svelte";
  import Notifications from "../../../components/Notifications/Notifications.svelte";
  import HorizontalStack from "../../../components/Stack/HorizontalStack.svelte";
  import VerticalStack from "../../../components/Stack/VerticalStack.svelte";
  import FuelIcon from "../../../public/images/fuel.svg";
  import type { Order, Payment } from "../../../types";
  import { BigNumber } from "ethers";
  import { orderDetails, orders } from "../../../stores";
  import { formatEther, parseEther } from "ethers/lib/utils.js";

  import { currentLanguageSelected } from "../../../stores"
  import { LanguageEnum } from "../../../types";
    import { breakpoints } from "../../../styles/breakpoints";

  let language: LanguageEnum;

  currentLanguageSelected.subscribe((value) => {
    language = value;
  });

  // Admin Panel Data
  let data = [
    {
      name: "Location",
      value: "Victory Gas Station - Pump 02",
    },
    {
      name: "License",
      value: "1435EF",
    },
    {
      name: "Fuel Added",
      value: $orderDetails.fuelAmount,
    },
    {
      name: "Cost (TWD)",
      value: String(Number(formatEther($orderDetails.amount)) * 30),
    },
    {
      name: "Cost (XDAI)",
      value: formatEther($orderDetails.amount),
    },
  ];

  let translatedData = [
    {
      name: "地點",
      value: "Victory Gas Station - Pump 02",
    },
    {
      name: "車牌",
      value: "1435EF",
    },
    {
      name: "公升",
      value: $orderDetails.fuelAmount,
    },
    {
      name: "費用 (TWD)",
      value: String(Number(formatEther($orderDetails.amount)) * 30),
    },
    {
      name: "費用 (XDAI)",
      value: formatEther($orderDetails.amount),
    },
  ];

  orderDetails.subscribe((value) => {
    data[2].value = value.fuelAmount;
    data[3].value = String(Number(formatEther(value.amount)) * 30);
    data[4].value = formatEther(value.amount);
  });

  let _orderDetails = $orderDetails;
  // let orders: Order[];

  onMount(async () => {
    let response = await fetch("/api/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    let _orders = await response.json();
    let _ordersKeys = Object.keys(_orders);
    $orders = _ordersKeys.map((key) => _orders[key]);
  });

  async function handleClick() {
    console.log("POST API");
    let data: Order = {
      item: {
        location: _orderDetails.location,
        licensePlate: _orderDetails.licensePlate,
        fuelAmount: _orderDetails.fuelAmount,
        amount: _orderDetails.amount,
      },
    };
    console.log("🚀 | handleClick | data:", data);
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("🚀 | handleClick | response:", response);

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

  async function handleClick2() {
    console.log("POST API");
    let data: Payment = {
      userAddress: "0x",
      orderId: "dcdd1f62-9ffe-4ace-9ab9-05d26de62024",
      amount: parseEther("0.1"),
    };
    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    let json = await response.json();
    console.log("🚀 | handleClick | json:", json);

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

  let screenSize: number;

</script>

<svelte:window bind:innerWidth={screenSize} />

<subheader>
  <img src={FuelIcon} alt={FuelIcon} />
  {#if language === LanguageEnum.EN}
    <title>Fuel</title> 
  {:else}
    <title>打油</title>
  {/if}
</subheader>

{#if screenSize < breakpoints.large}
  <VerticalStack>
    {#if language === LanguageEnum.EN}
      <title class="panel">Admin Panel</title>
      <DisplayGroup lineInfos={data} />
    {:else}
      <title class="panel">管理面板</title>
      <DisplayGroup lineInfos={translatedData} />
    {/if}
    <subtext>1USD = 1XDAI = 30.65 TWD</subtext>
    {#if language === LanguageEnum.EN}
      <Button buttonText="SIMULATE" {handleClick} />
      <Button buttonText="SIMULATE PAYMENT" handleClick={handleClick2} />
    {:else}
      <Button buttonText="模仿" {handleClick} />
      <Button buttonText="模仿支付" handleClick={handleClick2} />
    {/if}
  </VerticalStack>
  <VerticalStack>
    {#if language === LanguageEnum.EN}
      <title class="panel">User Panel</title>
    {:else}
      <title class="panel">用戶面板</title>
    {/if}
    <Notifications />
  </VerticalStack>
{:else}
  <HorizontalStack>
    <VerticalStack>
      {#if language === LanguageEnum.EN}
        <title class="panel">Admin Panel</title>
        <DisplayGroup lineInfos={data} />
      {:else}
        <title class="panel">管理面板</title>
        <DisplayGroup lineInfos={translatedData} />
      {/if}
      <subtext>1USD = 1XDAI = 30.65 TWD</subtext>
      {#if language === LanguageEnum.EN}
        <Button buttonText="SIMULATE" {handleClick} />
        <Button buttonText="SIMULATE PAYMENT" handleClick={handleClick2} />
      {:else}
        <Button buttonText="模仿" {handleClick} />
        <Button buttonText="模仿支付" handleClick={handleClick2} />
      {/if}
    </VerticalStack>
    <VerticalStack>
      {#if language === LanguageEnum.EN}
        <title class="panel">User Panel</title>
      {:else}
        <title class="panel">用戶面板</title>
      {/if}
      <Notifications />
    </VerticalStack>
  </HorizontalStack>
{/if}


<style>
  subheader {
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 80px;
    gap: 8px;
  }
  body {
    /* Body */

    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 40px;
    gap: 10px;
    align-content: start;
    justify-content: start;
    width: 100%;
    height: 100%;
  }
  subtext {
    width: auto;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;

    align-self: flex-start;

    color: #000000;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
  title {
    width: auto;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;

    display: flex;
    align-self: top;
    justify-self: top;
    color: #000000;
  }

  title.panel {
    align-self: flex-start;
    text-decoration: underline;
  }
</style>
