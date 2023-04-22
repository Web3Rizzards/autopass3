import { ethers } from "ethers";

export const getDisplayAddress = (
  address: string | null | undefined,
  size: number
): string => {
  if (!address || address === `-`) {
    return `-`;
  }

  if (ethers.utils.isAddress(address)) {
    return `${address.toString().slice(0, size)}...${address
      .toString()
      .slice(-size)}`;
  }
  return address;
};
