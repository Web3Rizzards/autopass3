import { IWagmiContract } from "@/utils/interfaces";
import env_var from "@/utils/env_var";
import StackingAbi from "./abi/MockStaking.json";
import PaymentSplitterAbi from "./abi/PaymentSplitter.json";

export const stakingContract: IWagmiContract = {
  address: env_var.STAKING_CONTRACT_ADDRESS,
  abi: StackingAbi.abi,
};

export const paymentSplitterContract: IWagmiContract = {
  address: env_var.PAYMENT_SPLITTER_CONTRACT_ADDRESS,
  abi: PaymentSplitterAbi.abi,
};
