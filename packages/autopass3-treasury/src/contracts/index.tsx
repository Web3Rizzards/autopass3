import { IWagmiContract } from "@/utils/interfaces";
import env_var from "@/utils/env_var";
import StackingAbi from "./abi/MockStaking.json";
import PaymentSplitterAbi from "./abi/PaymentSplitter.json";
import {
  PaymentSplitterAdressMapping,
  StakingContractAddressMapping,
} from "@/utils/chainToContractMapping";

export const stakingContract = (chainId: number): IWagmiContract => {
  return {
    address: StakingContractAddressMapping[chainId],
    abi: StackingAbi.abi,
  };
};

export const paymentSplitterContract = (chainId: number): IWagmiContract => {
  return {
    address: PaymentSplitterAdressMapping[chainId],
    abi: PaymentSplitterAbi.abi,
  };
};
