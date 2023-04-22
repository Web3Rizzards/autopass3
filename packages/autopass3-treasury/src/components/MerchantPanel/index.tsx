import { useState } from "react";
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

const MerchantPanel = () => {
  return (
    <MerchantPanelContainer>
      <MerchantPanelBar>
        <MerchantPanelTitle>Merchant</MerchantPanelTitle>
        <MerchantPanelButton>
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
