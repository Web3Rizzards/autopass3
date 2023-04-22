import { useEffect, useState } from "react";
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
import useDeposit from "@/hooks/useDeposit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import useWithdraw from "@/hooks/useWithdraw";

const AreaChartWithoutSSR = dynamic(import("@/components/AreaChart"), {
  ssr: false,
});

const InvestmentPanel = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data } = useFetchUserInformation();
  const { transactionHash: depositHash, isDepositing, deposit } = useDeposit();
  const {
    transactionHash: withdrawHash,
    isWithdrawing,
    withdraw,
  } = useWithdraw();

  const [amount, setAmount] = useState<string>("");

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleSetMax = () => {
    setAmount(ethers.utils.formatEther(data.balance));
  };

  const handleDeposit = () => {
    if (amount) {
      if (deposit) {
        deposit({
          recklesslySetUnpreparedArgs: [],
          recklesslySetUnpreparedOverrides: {
            from: address,
            value: ethers.utils.parseEther(amount),
          },
        });
      }
    }
  };

  const handleWithdraw = () => {
    if (withdraw) {
      withdraw({
        recklesslySetUnpreparedArgs: [],
        recklesslySetUnpreparedOverrides: {
          from: address,
          value: 0,
        },
      });
    }
  };

  useEffect(() => {
    if (depositHash || withdrawHash) {
      router.reload();
    }
  }, [depositHash, withdrawHash]);

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
          <InvestmentPanelButton type="button" onClick={handleDeposit}>
            <p>DEPOSIT</p>
          </InvestmentPanelButton>
          <InvestmentPanelButton type="button" onClick={handleWithdraw}>
            <p>WITHDRAW</p>
          </InvestmentPanelButton>
        </InvestmentPanelAction>
      </InvestmentPanelContent>
    </InvestmentPanelContainer>
  );
};

export default InvestmentPanel;
