import Image from "next/image";
import {
  NavigationContainer,
  NavigationContent,
  NavigationIcon,
} from "./style";
import AutopassLogo from "@/assets/images/autopass.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationContent>
        <NavigationIcon>
          <Image src={AutopassLogo} alt="Autopass" fill />
        </NavigationIcon>

        <ConnectButton />
      </NavigationContent>
    </NavigationContainer>
  );
};

export default Navigation;
