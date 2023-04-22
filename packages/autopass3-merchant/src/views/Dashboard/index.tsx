import {
  DashboardViewButton,
  DashboardViewContainer,
  DashboardViewContent,
  DashboardViewText,
  DashboardViewTitle,
} from "./style";

const DashboardView = () => {
  return (
    <DashboardViewContainer>
      <DashboardViewTitle>Merchant Dashboard</DashboardViewTitle>
      <DashboardViewContent>
        <DashboardViewText>Next Payout Date: 02/05/2023</DashboardViewText>
        <DashboardViewText>Pending Payout: USD420</DashboardViewText>
        <DashboardViewText>Wallet Balance: USD1000</DashboardViewText>
        <DashboardViewButton>
          <p>OFF RAMP TO FIAT</p>
        </DashboardViewButton>
      </DashboardViewContent>
    </DashboardViewContainer>
  );
};

export default DashboardView;
