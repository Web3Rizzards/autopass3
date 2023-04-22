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

const AreaChartWithoutSSR = dynamic(import("@/components/AreaChart"), {
  ssr: false,
});

const InvestmentPanel = () => {
  const [amount, setAmount] = useState<string>("");
  const [deposited, setDeposited] = useState<string>("10000");
  const [yieldEarned, setYieldEarned] = useState<string>("1100");

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
            Current Deposited: {deposited}
          </InvestmentPanelText>
          <InvestmentPanelText>Yield Earned: {deposited}</InvestmentPanelText>
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
