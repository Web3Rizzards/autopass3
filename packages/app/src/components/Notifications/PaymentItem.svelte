<script lang="ts">
  import PayButton from "../Button/PayButton.svelte";
  import FuelIcon from "../../public/images/fuel.svg";
  import { prepareWriteAutopassPaymentGateway } from "../../generated";
  import { formatEther, parseEther } from "ethers/lib/utils.js";
  import { getNetwork, writeContract } from "@wagmi/core";
  import type { Order } from "../../types";
  import { BigNumber } from "ethers";

  export let order: Order;
  let orderId = order.orderId;
  let location = order.item.location;
  let fuelAmount = order.item.fuelAmount;
  let xDAIAmount: string = formatEther(order.item.amount);
  console.log("🚀 | xDAIAmount:", xDAIAmount);
  let XDAIPaid: string = formatEther(order.amountReceived || 0);
  console.log("🚀 | XDAIPaid:", XDAIPaid);
  let XDAItoPay: string = String(Number(xDAIAmount) - Number(XDAIPaid));
  $: state = order.completed ? "Completed" : "Pending";

  async function handleClick() {
    console.log(orderId);
    let { chain } = getNetwork();
    if (orderId) {
      let config = await prepareWriteAutopassPaymentGateway({
        // @ts-ignore: chain.id should exist if deployment exist
        chainId: chain.id,
        functionName: "createPayment",
        args: [orderId, "0x"],
        overrides: { value: parseEther(XDAItoPay) },
      });
      let tx = await writeContract(config);
    }
  }
</script>

<container>
  <info>
    <img src={FuelIcon} alt={FuelIcon} />
    <info-text>
      <location-text>{location}</location-text>
      <amount-text>{Number(fuelAmount).toFixed(2)} L</amount-text>
    </info-text>
  </info>
  <div>
    <PayButton buttonText={`Pay ${Number(XDAItoPay).toFixed(2)} XDAI`} {handleClick} {state} />
  </div>
</container>

<style lang="scss">
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
  container {
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    gap: 10px;

    border-width: 0.5px 1px 4px 0.5px;
    border-style: solid;
    border-color: #000000;
    border-radius: 16px;

    background-color: #ffffff;

    /* add fade animation */
    animation: fadeInAnimation 0.5s ease-in-out;
  }

  info {
    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    font-family: "Courier Prime";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
  }
  info-text {
    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
  }
</style>
