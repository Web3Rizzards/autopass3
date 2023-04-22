import Image from "next/image";
import UserAccount from "../UserAccount";
import {
  NavigationContainer,
  NavigationContent,
  NavigationIcon,
} from "./style";
import AutopassLogo from "@/assets/images/autopass.svg";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationContent>
        <NavigationIcon>
          <Image src={AutopassLogo} alt="Autopass" fill />
        </NavigationIcon>
        <UserAccount />
      </NavigationContent>
    </NavigationContainer>
  );
};

export default Navigation;
