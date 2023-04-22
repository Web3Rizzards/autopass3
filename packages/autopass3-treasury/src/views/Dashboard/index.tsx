import TreasurySummary from "@/components/TreasurySummary";
import { DashboardContainer, DashboardTitle } from "./style";
import AdminPanel from "@/components/AdminPanel";
import MerchantPanel from "@/components/MerchantPanel";
import InvestmentPanel from "@/components/InvestmentPanel";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardTitle>Autopass Treasury</DashboardTitle>
      <TreasurySummary />
      <AdminPanel />
      <MerchantPanel />
      <InvestmentPanel />
    </DashboardContainer>
  );
};

export default Dashboard;
