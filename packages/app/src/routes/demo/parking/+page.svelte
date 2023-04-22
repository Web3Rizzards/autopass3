<script lang="ts">
  import VerticalStack from "../../../components/Stack/VerticalStack.svelte";
  import { currentLanguageSelected } from "../../../stores";
  import { LanguageEnum } from "../../../types";

  let language: LanguageEnum;

  currentLanguageSelected.subscribe((value) => {
    language = value;
  });

</script>

<VerticalStack>
  {#if language === LanguageEnum.EN}
    <title>Parking</title>
    <description>Coming Soon...</description>
  {:else}
    <title>停車場</title>
    <description>即将推出</description>
  {/if}
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
