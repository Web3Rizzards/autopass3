<script lang="ts">
  import { breakpoints } from "../../styles/breakpoints";
  import { goto } from '$app/navigation';
  import { LanguageEnum } from "../../types";
  import { currentLanguageSelected } from "../../stores";

  let language: LanguageEnum;
  currentLanguageSelected.subscribe((value) => {
    language = value;
  });
  
  let activeTab: string = "item1";
  let screenSize: number;
  function setActiveTab(tabName: string) {
    activeTab = tabName;
  }

  const handleRedirect = (url: string) => {
    goto(url)
    return
  }
</script>

<svelte:window bind:innerWidth={screenSize} />
{#if screenSize < breakpoints.large}
  <section>
    {#if language === LanguageEnum.EN}
      <button class={activeTab === "item1" ? "active" : ""} on:click={() => handleRedirect('/')}>
        Home
      </button>
      <button class={activeTab === "item2" ? "active" : ""} on:click={() => handleRedirect('/demo')}>
        Demo
      </button>
    {:else}
      <button class={activeTab === "item1" ? "active" : ""} on:click={() => handleRedirect('/')}>
        主頁
      </button>
      <button class={activeTab === "item2" ? "active" : ""} on:click={() => handleRedirect('/demo')}>
        示範
      </button>
    {/if}
   
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    right: 0;

    align-items: center;
    width: 100%;
    height: 100px;
  }

  button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    font-size: 16px;
    color: #000000;

    border: none;
    border-radius: 0px;
    cursor: pointer;
    margin: 0;
    box-shadow: none;
    height: 100%;
  }

  button.active {
    width: 100%;
    color: #000000;
    border: none;
    border-radius: 0px;
    font-weight: bold;
    box-shadow: none;
  }
</style>
