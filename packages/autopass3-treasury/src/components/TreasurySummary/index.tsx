import { TreasurySummaryContainer, TreasurySummaryTitle } from "./style";

const TreasurySummary = () => {
  const randomNumber = 10_000_000;

  const convertToDAI = (_number: number) => {
    return (_number / 1.102).toFixed(2);
  };
  return (
    <TreasurySummaryContainer>
      <TreasurySummaryTitle>
        Total Funds: {randomNumber} USD ({convertToDAI(randomNumber)} xDAI)
      </TreasurySummaryTitle>
    </TreasurySummaryContainer>
  );
};

export default TreasurySummary;
