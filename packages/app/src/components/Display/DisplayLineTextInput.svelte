<script lang="ts">
  import { parseEther } from "ethers/lib/utils.js";
  import { orderDetails } from "../../stores";
  import { BigNumber } from "ethers";

  interface LineInfo {
    name: string;
    value: string;
  }
  export let lineInfo: LineInfo = {
    name: "Name",
    value: "Value",
  };

  export const type = "text";

  export let key: "location" | "licensePlate" = "location";

  function handleChange() {
    $orderDetails[key] = lineInfo.value;
  }
</script>

<container>
  <info-name>{lineInfo.name}:</info-name>
  <input type="text" bind:value={lineInfo.value} on:input={handleChange} />
  <!-- <info-value-bg>
    <info-value>{lineInfo.value}</info-value>
  </info-value-bg> -->
</container>

<style>
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
  }
  info-name {
    width: 160px;
    height: 21px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;

    display: flex;
    align-items: center;

    color: #000000;
  }
  info-value-bg {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;

    width: 100%;
    height: 21px;

    background: #000000;
  }

  info-value-bg::-webkit-scrollbar {
    display: none;
  }

  info-value {
    font-family: "Courier Prime";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 17px;

    display: flex;
    align-items: center;

    color: #ffffff;
    animation: fadeInAnimation 0.5s ease-in-out;
  }

  input {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;

    width: 100%;
    height: 100%;

    background: #000000;
    font-family: "Courier Prime";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;

    display: flex;
    align-items: center;

    color: #ffffff;
    animation: fadeInAnimation 0.5s ease-in-out;
    border: none;
    appearance: none;
    padding: 0px;
  }
</style>
