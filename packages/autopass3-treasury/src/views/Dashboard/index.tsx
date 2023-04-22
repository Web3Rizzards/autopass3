import TreasurySummary from "@/components/TreasurySummary";
import { DashboardContainer, DashboardTitle } from "./style";
import AdminPanel from "@/components/AdminPanel";
import MerchantPanel from "@/components/MerchantPanel";
import InvestmentPanel from "@/components/InvestmentPanel";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { address } = useAccount();

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setLoaded(true);
    }
  }, [address]);

  return (
    <DashboardContainer>
      <DashboardTitle>Autopass Treasury</DashboardTitle>
      {loaded && (
        <>
          <TreasurySummary />
          <AdminPanel />
          <MerchantPanel />
          <InvestmentPanel />
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
