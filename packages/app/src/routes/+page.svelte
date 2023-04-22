<script lang="ts">
  import SearchBox from "../components/Input/SearchBox.svelte";
  import VerticalStack from "../components/Stack/VerticalStack.svelte";
  import Table from "../components/Table/Table.svelte";

  import { currentLanguageSelected } from "../stores";
  import { LanguageEnum } from "../types";

  let language: LanguageEnum;

  currentLanguageSelected.subscribe((value) => {
    language = value;
  });
</script>

<VerticalStack>
  {#if language === LanguageEnum.EN}
    <title>AUTOPASS3</title>
    <description>Enabling cryptocurrency payments for AUTOPASS</description>
  {:else}
    <title>車麻吉3</title>
    <description>為車麻吉啟用加密貨幣支付</description>
  {/if}
  <Table />
</VerticalStack>

<style lang="scss">
  @import "../styles/colours";

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

  description {
    width: auto;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
  }
</style>
