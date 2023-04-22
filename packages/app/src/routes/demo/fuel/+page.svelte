<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../../components/Button/Button.svelte";
  import DisplayGroup from "../../../components/Display/DisplayGroup.svelte";
  import Notifications from "../../../components/Notifications/Notifications.svelte";
  import HorizontalStack from "../../../components/Stack/HorizontalStack.svelte";
  import VerticalStack from "../../../components/Stack/VerticalStack.svelte";
  import FuelIcon from "../../../public/images/fuel.svg";
  import type { Order } from "../../../types";

  let data = [
    {
      name: "Location",
      value: "POPOP Taipei Gas Station",
    },
    {
      name: "Fuel Added",
      value: "80 L",
    },
    {
      name: "Cost (TWD)",
      value: "2480 TWD",
    },
    {
      name: "Cost (XDAI)",
      value: "80.91 XDAI",
    },
  ];
  let orders: Order[] = [];

  onMount(async () => {
    let response = await fetch("/api/order", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    orders = await response.json();
  });

  async function handleClick() {
    console.log("SIMULATE");
  }
</script>

<subheader>
  <img src={FuelIcon} alt={FuelIcon} />
  <title>Fuel</title>
</subheader>
<HorizontalStack>
  <VerticalStack>
    <title class="panel">Admin Panel</title>
    <DisplayGroup lineInfos={data} />
    <subtext>1USD = 1XDAI = 30.65 TWD</subtext>
    <Button buttonText="SIMULATE" {handleClick} />
  </VerticalStack>
  <VerticalStack>
    <title class="panel">User Panel</title>
    <Notifications {orders} />
  </VerticalStack>
</HorizontalStack>

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
