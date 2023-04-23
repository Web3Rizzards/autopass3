import { useEffect, useState } from "react";
import {
  UserAccountButton,
  UserAccountContainer,
  UserAccountInputContainer,
  UserAccountText,
} from "./style";
import { getDisplayAddress } from "@/utils/helper";
import { useWeb3Auth } from "@/context/Web3Auth";
import { useRouter } from "next/router";
import TextField from "../TextField";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { LOGIN_WEB3_AUTH, LOGOUT_WEB3_AUTH } from "@/context/actionType";

const MagicUserAccount = () => {
  const router = useRouter();
  const { state, dispatch } = useWeb3Auth();

  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [magic, setMagic] = useState<any>();

  const login = async () => {
    if (magic) {
      try {
        const key = await magic.auth.loginWithMagicLink({ email });
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        dispatch({
          type: LOGIN_WEB3_AUTH,
          address: userAddress,
          provider,
          chainId: "0x5",
          magicKey: key,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = async () => {
    await magic.user.logout();
    dispatch({
      type: LOGOUT_WEB3_AUTH,
    });
  };

  const handleChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    if (window) {
      setMagic(
        new Magic("pk_live_BD1909BDD8985A18", {
          network: "goerli",
        })
      );
    }
  }, []);

  return (
    <UserAccountContainer>
      {state.provider && state.address ? (
        <>
          <UserAccountText onClick={handleRedirect}>
            <p>Dashboard</p>
          </UserAccountText>
          <UserAccountText>
            <p>{getDisplayAddress(state.address, 4)}</p>
          </UserAccountText>
          <UserAccountButton type="button" onClick={logout}>
            <p>Sign out</p>
          </UserAccountButton>
        </>
      ) : (
        <>
          <UserAccountInputContainer>
            <TextField
              label="Email"
              type="text"
              handleChange={handleChangeEmail}
            />
          </UserAccountInputContainer>

          <UserAccountButton type="button" onClick={login}>
            <p>Sign In</p>
          </UserAccountButton>
        </>
      )}
    </UserAccountContainer>
  );
};

export default MagicUserAccount;
