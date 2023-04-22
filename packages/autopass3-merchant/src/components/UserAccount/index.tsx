import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import env_var from "@/utils/env_var";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import RPC from "../../utils/ethersRPC"; // for using ethers.js
import {
  UserAccountButton,
  UserAccountContainer,
  UserAccountText,
} from "./style";
import { getDisplayAddress } from "@/utils/helper";
import { useWeb3Auth } from "@/context/Web3Auth";
import { LOGIN_WEB3_AUTH, LOGOUT_WEB3_AUTH } from "@/context/actionType";

const UserAccount = () => {
  const { state, dispatch } = useWeb3Auth();
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: env_var.WEB3AUTH_CLIENT_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        const walletConnectV1Adapter = new WalletConnectV1Adapter({
          adapterSettings: {
            bridge: "https://bridge.walletconnect.org",
          },
          clientId: env_var.WEB3AUTH_CLIENT_ID,
        });

        web3auth.configureAdapter(walletConnectV1Adapter);

        // adding metamask adapter

        const metamaskAdapter = new MetamaskAdapter({
          clientId: env_var.WEB3AUTH_CLIENT_ID,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    console.log("am i here");
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log("Logged in Successfully!");

    if (web3authProvider) {
      const rpc = new RPC(web3authProvider);
      const address = await rpc.getAccounts();

      setAddress(address);

      dispatch({
        type: LOGIN_WEB3_AUTH,
        address,
        provider: web3authProvider,
        chainId: "0x5",
      });
    }
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);

    dispatch({
      type: LOGOUT_WEB3_AUTH,
    });
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };

  // const addChain = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const newChain = {
  //     chainId: "0x5",
  //     displayName: "Goerli",
  //     chainNamespace: CHAIN_NAMESPACES.EIP155,
  //     tickerName: "Goerli",
  //     ticker: "ETH",
  //     decimals: 18,
  //     rpcTarget: "https://rpc.ankr.com/eth_goerli",
  //     blockExplorer: "https://goerli.etherscan.io",
  //   };
  //   await web3auth?.addChain(newChain);
  //   console.log("New Chain Added");
  // };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  return (
    <UserAccountContainer>
      {state.provider && state.address ? (
        <>
          <UserAccountText>
            <p>{getDisplayAddress(address, 4)}</p>
          </UserAccountText>
          <UserAccountButton type="button" onClick={logout}>
            <p>Sign out</p>
          </UserAccountButton>
        </>
      ) : (
        <>
          <UserAccountButton type="button" onClick={login}>
            <p>Sign In</p>
          </UserAccountButton>
        </>
      )}
    </UserAccountContainer>
  );
};

export default UserAccount;
