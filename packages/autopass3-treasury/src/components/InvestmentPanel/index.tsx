import { useState } from "react";
import TextField from "../TextField";
import {
  InvestmentPanelAction,
  InvestmentPanelButton,
  InvestmentPanelContainer,
  InvestmentPanelContent,
  InvestmentPanelGraph,
  InvestmentPanelInputContainer,
  InvestmentPanelMaxButton,
  InvestmentPanelText,
  InvestmentPanelTitle,
} from "./style";

import dynamic from "next/dynamic";
import useFetchUserInformation from "@/hooks/useFetchUserInformation";
import { ethers } from "ethers";

const AreaChartWithoutSSR = dynamic(import("@/components/AreaChart"), {
  ssr: false,
});

const InvestmentPanel = () => {
  const { data } = useFetchUserInformation();

  const [amount, setAmount] = useState<string>("");

  const MAX_AMOUNT = "10000";

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleSetMax = () => {
    console.log("here");
    setAmount(MAX_AMOUNT);
  };

  return (
    <InvestmentPanelContainer>
      <InvestmentPanelTitle>Investments</InvestmentPanelTitle>
      <InvestmentPanelContent>
        <InvestmentPanelGraph>
          <AreaChartWithoutSSR />
        </InvestmentPanelGraph>
        <InvestmentPanelAction>
          <InvestmentPanelInputContainer>
            <TextField
              label="Amount"
              type="number"
              handleChange={handleAmountChange}
              value={amount}
            />
            <InvestmentPanelMaxButton type="button" onClick={handleSetMax}>
              <p>MAX</p>
            </InvestmentPanelMaxButton>
          </InvestmentPanelInputContainer>

          <InvestmentPanelText>
            Current Deposited: {ethers.utils.formatEther(data.stakedAmount)}{" "}
            xDAI
          </InvestmentPanelText>
          <InvestmentPanelText>
            Yield Earned: {ethers.utils.formatEther(data.yield)} xDAI
          </InvestmentPanelText>
          <InvestmentPanelButton>
            <p>DEPOSIT</p>
          </InvestmentPanelButton>
          <InvestmentPanelButton>
            <p>WITHDRAW</p>
          </InvestmentPanelButton>
        </InvestmentPanelAction>
      </InvestmentPanelContent>
    </InvestmentPanelContainer>
  );
};

export default InvestmentPanel;
