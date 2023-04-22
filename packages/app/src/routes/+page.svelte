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
    <description>Here are some description</description>
  {:else}
    <title>車麻吉3</title>
    <description>車麻吉3是一個平台-車主最愛的智慧懶人錢包
      帶你行車一路暢通、優惠輕鬆掌控</description>
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
