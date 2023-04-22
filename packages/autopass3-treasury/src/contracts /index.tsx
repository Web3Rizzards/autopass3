import { IWagmiContract } from "@/utils/interfaces";
import env_var from "@/utils/env_var";
import StackingAbi from "./abi/MockStaking.json";

export const stakingContract: IWagmiContract = {
  address: env_var.STAKING_CONTRACT_ADDRESS,
  abi: StackingAbi.abi,
};
