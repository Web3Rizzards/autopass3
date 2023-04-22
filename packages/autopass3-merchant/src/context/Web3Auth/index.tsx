import React from "react";
import { PropsWithChildren } from "react";
import { LOGIN_WEB3_AUTH, LOGOUT_WEB3_AUTH } from "../actionType";

type Login = {
  type: "LOGIN_WEB3_AUTH";
  address: string;
  chainId: string;
  provider: any;
};

type Logout = {
  type: "LOGOUT_WEB3_AUTH";
};

type Action = Login | Logout;

type State = {
  address: string;
  chainId: string;
  provider: any;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  address: "",
  chainId: "",
  provider: null,
} as const;

const Web3AuthContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function web3AuthReducer(state: State, action: Action): State {
  switch (action.type) {
    case LOGIN_WEB3_AUTH: {
      const { address, chainId, provider } = action;
      return {
        ...state,
        address,
        chainId,
        provider,
      } as State;
    }

    case LOGOUT_WEB3_AUTH: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}

function Web3AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(web3AuthReducer, initialState);
  const value = { state, dispatch };

  return (
    <Web3AuthContext.Provider value={value}>
      {children}
    </Web3AuthContext.Provider>
  );
}

function useWeb3Auth() {
  const context = React.useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
}

export { Web3AuthProvider, useWeb3Auth };
