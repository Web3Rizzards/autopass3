import { useEffect, useState } from "react";
import TextField from "../TextField";
import {
  MerchantPanelBar,
  MerchantPanelButton,
  MerchantPanelContainer,
  MerchantPanelData,
  MerchantPanelDataContent,
  MerchantPanelDataHeader,
  MerchantPanelDataRow,
  MerchantPanelTitle,
} from "./style";
import { MerchantData } from "@/data";
import usePayout from "@/hooks/usePayout";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const MerchantPanel = () => {
  const router = useRouter();

  const { address } = useAccount();
  const { transactionHash, isPayout, payout } = usePayout();

  const handlePayout = async () => {
    if (payout) {
      payout({
        recklesslySetUnpreparedArgs: [
          ["0x0000000000000000000000000000000000000000"],
          ["0"],
        ],
        recklesslySetUnpreparedOverrides: {
          from: address,
          value: 0,
        },
      });
    }
  };

  useEffect(() => {
    if (transactionHash) {
      router.reload();
    }
  }, [transactionHash]);

  return (
    <MerchantPanelContainer>
      <MerchantPanelBar>
        <MerchantPanelTitle>Merchant</MerchantPanelTitle>
        <MerchantPanelButton type="button" onClick={handlePayout}>
          <p>PAYOUT</p>
        </MerchantPanelButton>
      </MerchantPanelBar>
      <MerchantPanelData>
        <MerchantPanelDataHeader>
          <p style={{ width: "10%" }}>Merchant ID</p>
          <p style={{ width: "35%" }}>Name</p>
          <p style={{ width: "20%" }}>Address</p>
          <p style={{ width: "20%" }}>Revenue (xDAI)</p>
          <p style={{ width: "15%" }}>Due Date</p>
        </MerchantPanelDataHeader>
        <MerchantPanelDataContent>
          {MerchantData.map((entry) => (
            <>
              <MerchantPanelDataRow>
                <p style={{ width: "10%" }}>{entry.id}</p>
                <p style={{ width: "35%" }}>{entry.name}</p>
                <p style={{ width: "20%" }}>{entry.address}</p>
                <p style={{ width: "20%" }}>{entry.revenue}</p>
                <p style={{ width: "15%" }}>{entry.dueDate}</p>
              </MerchantPanelDataRow>
            </>
          ))}
        </MerchantPanelDataContent>
      </MerchantPanelData>
    </MerchantPanelContainer>
  );
};

export default MerchantPanel;
