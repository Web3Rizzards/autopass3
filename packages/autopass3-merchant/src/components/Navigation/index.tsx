import Image from "next/image";
import {
  NavigationContainer,
  NavigationContent,
  NavigationIcon,
} from "./style";
import AutopassLogo from "@/assets/images/autopass.svg";
import MagicUserAccount from "../MagicUserAccount";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationContent>
        <NavigationIcon>
          <Image src={AutopassLogo} alt="Autopass" fill />
        </NavigationIcon>
        <MagicUserAccount />
      </NavigationContent>
    </NavigationContainer>
  );
};

export default Navigation;
