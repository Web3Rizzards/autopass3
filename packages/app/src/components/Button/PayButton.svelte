<script lang="ts">
  import CoinIcon from "../../public/images/coin.svg";
  export let handleClick: () => void = async () => {
    console.log("Unassigned Button");
  };
  export let buttonText = "INSERT_TEXT";
  export let state = "Pending";

  if (state === "Completed") {
    buttonText = "Payment Complete";
  }

  async function _handleClick() {
    if (state === "Pending") {
      console.log("PAY");
      state = "loading";
      buttonText = "Processing...";
      await handleClick();
      buttonText = "Payment Complete";
    }
  }
</script>

<button class={state} on:click={_handleClick}>
  {#if state === "Pending"}
    <img src={CoinIcon} alt={CoinIcon} />
  {/if}
  <button-text class={state}>{buttonText}</button-text>
</button>

<style>
  /* your styles go here */
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;

    width: 100%;
    height: 40px;

    border: none;
    background: #fff800;
    border-bottom: 4px solid #d8d200;
    box-shadow: 0px 0px 4px #d8d200;
    border-radius: 10px;
    cursor: pointer;

    /* Inside auto layout */
  }

  button.loading {
    background: #9a9a9a;
    opacity: 0.5;
    border-bottom: 4px solid #9a9a9a;
    border-radius: 10px;
    box-shadow: none;
  }

  button.Completed {
    background: #9a9a9a;
    border-bottom: 4px solid #9a9a9a;
    border-radius: 10px;
    box-shadow: none;
  }
  button-text {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: #443418;
  }
  button-text.loading {
  }
  button-text.Completed {
  }
</style>
