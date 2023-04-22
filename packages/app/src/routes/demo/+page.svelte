<script lang="ts">
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";

  import MenuButton from "../../components/Button/MenuButton.svelte";
  import HorizontalStack from "../../components/Stack/HorizontalStack.svelte";

  import RepairIcon from "../../public/images/tools.svg";
  import ParkingIcon from "../../public/images/parking.svg";
  import FuelIcon from "../../public/images/fuel.svg";
</script>

<VerticalStack>
  <!-- <Button />
  <SignMessageButton />
  {$signature}
  <SignTypedMessageButton />
  {$typedSignature}
  <Button buttonText="GET API" handleClick={handleGetAPI} />
  <Button buttonText="POST API" handleClick={handlePostAPI} />
  <Button buttonText="PAY" handleClick={handlePay} />
  {txHash} -->
  <HorizontalStack>
    <MenuButton buttonText="Parking" link="/demo/parking" icon={ParkingIcon} />
    <MenuButton buttonText="Fuel" link="/demo/fuel" icon={FuelIcon} />
    <MenuButton buttonText="Repair" link="/demo/repair" icon={RepairIcon} />
  </HorizontalStack>
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
