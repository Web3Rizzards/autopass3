import TreasurySummary from "@/components/TreasurySummary";
import { DashboardContainer, DashboardTitle } from "./style";
import AdminPanel from "@/components/AdminPanel";
import MerchantPanel from "@/components/MerchantPanel";
import InvestmentPanel from "@/components/InvestmentPanel";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address } = useAccount();
  return (
    <DashboardContainer>
      <DashboardTitle>Autopass Treasury</DashboardTitle>
      {address && (
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
