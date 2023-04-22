<script lang="ts">
  import { currentLanguageSelected } from "../../stores";
  import { LanguageEnum } from "../../types";

  let language: LanguageEnum;

  currentLanguageSelected.subscribe((value) => {
    language = value;
  });

  const handleLanguageChange = () => {
    if (language === LanguageEnum.EN) {
      currentLanguageSelected.set(LanguageEnum.CN);
    } else {
      currentLanguageSelected.set(LanguageEnum.EN);
    }
  };
</script>

<button on:click={handleLanguageChange}>
  <p class={language === LanguageEnum.EN ? "selected" : ""}>EN</p>
  <p>|</p>
  <p class={language === LanguageEnum.CN ? "selected" : ""}>CN</p>
</button>

<style>
  button {
    background: transparent;
    border: none;
    padding: none;
    margin: none;

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }

  p {
    color: black;
  }

  .selected {
    color: #767676;
    font-weight: 700;
  }
</style>
