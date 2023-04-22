<script lang="ts">
  import ParkingIcon from "../../public/images/parking2.svg";

  export let handleClick: () => void = () => {
    console.log("Unassigned Button");
  };
  export let buttonText = "INSERT_TEXT";
  export let link = "/";
  export let icon = ParkingIcon;
</script>

<a href={link}>
  <button-container>
    <button on:click={handleClick}>
      <img src={icon} alt={ParkingIcon} />
    </button>
    <button-text>{buttonText}</button-text>
  </button-container>
</a>

<style>
  /* your styles go here */
  a {
    color: #000000;
    text-decoration: none;
  }
  button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 16px;
  }

  button {
    /* Buttons */

    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;

    background-color: #ffffff;
    border-width: 0.5px 1px 4px 0.5px;
    border-style: solid;
    border-color: #000000;
    border-radius: 16px;
    cursor: pointer;

    /* Inside auto layout */
  }
  button-text {
    /* NEXT */

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  img {
    height: 150px;
    width: 150px;
  }
</style>
