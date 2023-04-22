import env_var from "@/utils/env_var";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useContractReads } from "wagmi";
import { stakingContract } from "@/contracts ";
import { getProvider } from "@wagmi/core";
// import ChainToAddressMapping, {
//   ContractName,
// } from "@/utils/chainToAdressMapping";
// import { ChainIdToChainName } from "@/utils/chains";

interface IData {
  yield: string;
  stakedAmount: string;
  balance: string;
}

const useFetchUserInformation = () => {
  const { address } = useAccount();
  const provider = getProvider();
  const [data, setData] = useState<IData>({
    yield: "0",
    stakedAmount: "0",
    balance: "0",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: _data,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...stakingContract,
        functionName: "userInfo",
        args: [env_var.AUTOPASS_ADDRESS],
        // args: [address],
      },
      {
        ...stakingContract,
        functionName: "pendingReward",
        args: [env_var.AUTOPASS_ADDRESS],
        // args: [address],
      },
    ],
  });

  const getBalance = async () => {
    if (address) {
      const bal = await provider.getBalance(address);
      return Number(bal).toLocaleString("fullwide", {
        useGrouping: false,
        maximumSignificantDigits: 10,
      });
    }
    return "";
  };

  const fetchData = async () => {
    setLoading(true);

    if (_data) {
      const bal = await getBalance();
      setData({
        stakedAmount: Number(_data[0][0])?.toLocaleString("fullwide", {
          useGrouping: false,
          maximumSignificantDigits: 10,
        }),
        yield: Number(_data[1])?.toLocaleString("fullwide", {
          useGrouping: false,
          maximumSignificantDigits: 10,
        }),
        balance: bal,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading, fetchData };
};

export default useFetchUserInformation;
