import { Address } from "wagmi";

const env_var = {
  STAKING_CONTRACT_ADDRESS: (process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS ||
    "0x0000000000000000000000000000000000000000") as Address,
  ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
  AUTOPASS_ADDRESS: process.env.NEXT_PUBLIC_AUTOPASS_ADDRESS || "",
};

export default env_var;
