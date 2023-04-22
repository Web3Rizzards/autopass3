import SubmitAddress from "@/components/SubmitAddress";
import { HomeViewContainer, HomeViewTitle } from "./style";
import { useWeb3Auth } from "@/context/Web3Auth";

const HomeView = () => {
  const { state, dispatch } = useWeb3Auth();

  return (
    <HomeViewContainer>
      <HomeViewTitle>Merchant Registration</HomeViewTitle>
      {state.provider && state.address && <SubmitAddress />}
    </HomeViewContainer>
  );
};

export default HomeView;
