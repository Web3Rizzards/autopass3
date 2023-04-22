import useFetchUserInformation from "@/hooks/useFetchUserInformation";
import { TreasurySummaryContainer, TreasurySummaryTitle } from "./style";
import { ethers } from "ethers";

const TreasurySummary = () => {
  const { data } = useFetchUserInformation();

  const convertToUSD = (_number: number) => {
    return (_number * 0.6014).toFixed(2);
  };

  return (
    <TreasurySummaryContainer>
      <TreasurySummaryTitle>
        Total Funds:{" "}
        {convertToUSD(Number(ethers.utils.formatEther(data.balance)))} USD (
        {ethers.utils.formatEther(data.balance)} xDAI)
      </TreasurySummaryTitle>
    </TreasurySummaryContainer>
  );
};

export default TreasurySummary;
