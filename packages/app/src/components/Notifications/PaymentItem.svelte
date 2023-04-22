<script lang="ts">
  import PayButton from "../Button/PayButton.svelte";
  import FuelIcon from "../../public/images/fuel.svg";
  import { prepareWriteAutopassPaymentGateway } from "../../generated";
  import { formatEther, parseEther } from "ethers/lib/utils.js";
  import { writeContract } from "@wagmi/core";
  import type { Order } from "../../types";

  export let order: Order;
  let orderId = order.orderId;
  let location = order.item.location;
  let fuelAmount = order.item.fuelAmount;
  let xDAIAmount = formatEther(order.item.amount);

  let state = "ready";

  async function handleClick() {
    console.log(orderId);
    if (orderId) {
      let config = await prepareWriteAutopassPaymentGateway({
        functionName: "createPayment",
        args: [orderId, "0x"],
        overrides: { value: parseEther(xDAIAmount) },
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
      <amount-text>{fuelAmount}</amount-text>
    </info-text>
  </info>
  <div>
    <PayButton buttonText={`Pay ${xDAIAmount} XDAI`} {handleClick} />
  </div>
</container>

<style lang="scss">
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
