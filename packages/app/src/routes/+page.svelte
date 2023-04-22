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

<div style="padding: 10px;">
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
</div>

<style lang="scss">
  @import "../styles/colours";
  @import "../styles/breakpoints";

  title {
    width: auto;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 3rem;

    display: flex;
    align-items: center;

    color: #000000;


    @media screen and (min-width: $large) {
      font-size: 5rem;
    }
  }

  description {
    width: auto;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 1.3rem;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: left;

    color: #000000;

    @media screen and (min-width: $large) {
      font-size: 2rem;
      line-height: 54px;
      text-align: center;
    }
  }

  
</style>
