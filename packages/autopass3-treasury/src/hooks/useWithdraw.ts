import { stakingContract } from "@/contracts ";
import { processErrorMessage } from "@/utils/errorMessage";
import { IOverrideArgs } from "@/utils/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContract, useContractWrite, useProvider } from "wagmi";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

const useWithdraw = () => {
  const provider = useProvider();
  const contract = useContract({
    ...stakingContract,
    signerOrProvider: provider,
  });

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [mintingError, setMintingError] = useState<string>("");

  const prepareOverridesArgsForWithdraw = async (
    account: string
  ): Promise<IOverrideArgs> => {
    let estimatedGas = 200000;

    if (contract) {
      try {
        const estimatedGasFromContract = await contract.estimateGas.deposit({
          from: account,
          value: ethers.utils.parseEther("0"),
        });
        estimatedGas = estimatedGasFromContract.mul(11).div(10).toNumber();
      } catch (error: any) {
        if (error.code !== INSUFFICIENT_FUNDS_ERROR_CODE) {
          return {
            from: account,
            value: ethers.utils.parseEther("0"),
          };
        }
      }
    }

    return {
      from: account,
      value: ethers.utils.parseEther("0"),
      gasLimit: estimatedGas,
    };
  };

  const {
    data: withdrawData,
    isLoading: withdrawing,
    error: withdrawError,
    write: withdraw,
    reset: resetWithdraw,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...stakingContract,
    functionName: "deposit",
    chainId: 5,
  });

  const processTransaction = async () => {
    if (withdrawData) {
      const txnReceipt = await withdrawData.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsWithdrawing(false);
    }
  };

  useEffect(() => {
    if (withdrawData) {
      processTransaction();
    } else {
      setTransactionHash("");
    }
  }, [withdrawData]);

  useEffect(() => {
    setMintingError("");
    if (withdrawing) {
      setIsWithdrawing(true);
    } else {
      if (transactionHash) {
        setIsWithdrawing(false);
      } else if (withdrawError) {
        setMintingError(processErrorMessage(withdrawError));
        setIsWithdrawing(false);
      }
    }
  }, [withdrawing]);

  const clearData = () => {
    resetWithdraw();
    setTransactionHash("");
    setMintingError("");
  };

  return {
    transactionHash,
    isWithdrawing,
    mintingError,
    withdraw,
    prepareOverridesArgsForWithdraw,
    clearData,
  };
};

export default useWithdraw;
