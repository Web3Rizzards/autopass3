import { stakingContract } from "@/contracts ";
import { processErrorMessage } from "@/utils/errorMessage";
import { IOverrideArgs } from "@/utils/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContract, useContractWrite, useProvider } from "wagmi";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useDeposit = () => {
  const provider = useProvider();
  const contract = useContract({
    ...stakingContract,
    signerOrProvider: provider,
  });

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [mintingError, setMintingError] = useState<string>("");

  const prepareOverridesArgsForDeposit = async (
    amount: string,
    account: string
  ): Promise<IOverrideArgs> => {
    let estimatedGas = 200000;

    if (contract) {
      try {
        const estimatedGasFromContract = await contract.estimateGas.deposit({
          from: account,
          value: ethers.utils.parseEther(amount),
        });
        estimatedGas = estimatedGasFromContract.mul(11).div(10).toNumber();
      } catch (error: any) {
        if (error.code !== INSUFFICIENT_FUNDS_ERROR_CODE) {
          return {
            from: account,
            value: ethers.utils.parseEther(amount),
          };
        }
      }
    }

    return {
      from: account,
      value: ethers.utils.parseEther(amount),
      gasLimit: estimatedGas,
    };
  };

  const {
    data: depositData,
    isLoading: depositing,
    error: depositError,
    write: deposit,
    reset: resetDeposit,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...stakingContract,
    functionName: "deposit",
    chainId: 5,
  });

  const processTransaction = async () => {
    if (depositData) {
      const txnReceipt = await depositData.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsDepositing(false);
    }
  };

  useEffect(() => {
    if (depositData) {
      processTransaction();
    } else {
      setTransactionHash("");
    }
  }, [depositData]);

  useEffect(() => {
    setMintingError("");
    if (depositing) {
      setIsDepositing(true);
    } else {
      if (transactionHash) {
        setIsDepositing(false);
      } else if (depositError) {
        setMintingError(processErrorMessage(depositError));
        setIsDepositing(false);
      }
    }
  }, [depositing]);

  const clearData = () => {
    resetDeposit();
    setTransactionHash("");
    setMintingError("");
  };

  return {
    transactionHash,
    isDepositing,
    mintingError,
    deposit,
    prepareOverridesArgsForDeposit,
    clearData,
  };
};

export default useDeposit;
