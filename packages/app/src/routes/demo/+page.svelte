<script lang="ts">
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";

  import MenuButton from "../../components/Button/MenuButton.svelte";
  import HorizontalStack from "../../components/Stack/HorizontalStack.svelte";

  import RepairIcon from "../../public/images/repair.svg";
  import ParkingIcon from "../../public/images/parking2.svg";
  import FuelIcon from "../../public/images/gas.svg";

  import { currentLanguageSelected } from "../../stores";
  import { LanguageEnum } from "../../types";
    import { breakpoints } from "../../styles/breakpoints";

  let language: LanguageEnum;

  currentLanguageSelected.subscribe((value) => {
    language = value;
  });

  let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />


<VerticalStack>

  {#if screenSize < breakpoints.large}
    {#if language === LanguageEnum.EN}
      <MenuButton buttonText="Parking" link="/demo/parking" icon={ParkingIcon} />
      <MenuButton buttonText="Fuel" link="/demo/fuel" icon={FuelIcon} />
      <MenuButton buttonText="Repair" link="/demo/repair" icon={RepairIcon} />
    {:else}
      <MenuButton buttonText="停車場" link="/demo/parking" icon={ParkingIcon} />
      <MenuButton buttonText="打油" link="/demo/fuel" icon={FuelIcon} />
      <MenuButton buttonText="修理" link="/demo/repair" icon={RepairIcon} />
    {/if}
  {:else}
    <HorizontalStack>
      {#if language === LanguageEnum.EN}
        <MenuButton buttonText="Parking" link="/demo/parking" icon={ParkingIcon} />
        <MenuButton buttonText="Fuel" link="/demo/fuel" icon={FuelIcon} />
        <MenuButton buttonText="Repair" link="/demo/repair" icon={RepairIcon} />
      {:else}
        <MenuButton buttonText="停車場" link="/demo/parking" icon={ParkingIcon} />
        <MenuButton buttonText="打油" link="/demo/fuel" icon={FuelIcon} />
        <MenuButton buttonText="修理" link="/demo/repair" icon={RepairIcon} />
      {/if}
    </HorizontalStack>
  {/if}


  <!-- <Button />
  <SignMessageButton />
  {$signature}
  <SignTypedMessageButton />
  {$typedSignature}
  <Button buttonText="GET API" handleClick={handleGetAPI} />
  <Button buttonText="POST API" handleClick={handlePostAPI} />
  <Button buttonText="PAY" handleClick={handlePay} />
  {txHash} -->
  
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
