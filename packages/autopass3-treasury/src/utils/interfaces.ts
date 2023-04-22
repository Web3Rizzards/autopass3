import { ethers } from "ethers";
import { Address } from "wagmi";

export interface IWagmiContract {
  address: Address;
  abi: any; // Figure out the typing for this
}

export interface IOverrideArgs {
  from: string;
  value?: ethers.BigNumber;
  gasLimit?: number;
}
