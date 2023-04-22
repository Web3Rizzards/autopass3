<script lang="ts">
  import DisplayLine from "./DisplayLine.svelte";
  import DisplayLineNumberInput from "./DisplayLineNumberInput.svelte";
  import DisplayLineTextInput from "./DisplayLineTextInput.svelte";

  interface LineInfo {
    name: string;
    value: string;
  }
  export let lineInfos: LineInfo[] = [
    {
      name: "Name",
      value: "Value",
    },
    {
      name: "Name2",
      value: "Value2",
    },
    {
      name: "Name3",
      value: "Value3",
    },
  ];
</script>

<container>
  <DisplayLineTextInput lineInfo={lineInfos[0]} key="location" />
  <DisplayLineTextInput lineInfo={lineInfos[1]} key="licensePlate" />
  <DisplayLineNumberInput lineInfo={lineInfos[2]} key="fuelAmount" />
  <DisplayLine lineInfo={lineInfos[3]} />
  <DisplayLine lineInfo={lineInfos[4]} />
</container>

<style>
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: none;
    width: 100%;
    order: 0;
    flex-grow: 0;
  }
  info-name {
    width: auto;
    height: 21px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;

    display: flex;
    align-items: center;

    color: #000000;

    flex: none;
    order: 0;
    flex-grow: 1;
  }
  info-value-bg {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    overflow-x: scroll;
    gap: 10px;

    width: 100%;
    height: 21px;

    background: #000000;
  }

  info-value-bg::-webkit-scrollbar {
    display: none;
  }

  info-value {
    font-family: "Courier Prime";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 17px;

    display: flex;
    align-items: center;

    color: #ffffff;
    width: 100%;
    animation: fadeInAnimation 0.5s ease-in-out;
  }
</style>
