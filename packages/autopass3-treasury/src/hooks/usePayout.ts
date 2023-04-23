import { paymentSplitterContract } from "@/contracts";
import { processErrorMessage } from "@/utils/errorMessage";
import { IOverrideArgs } from "@/utils/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContract, useContractWrite, useNetwork, useProvider } from "wagmi";

const INSUFFICIENT_FUNDS_ERROR_CODE = "INSUFFICIENT_FUNDS";

export const arrayOfPayouts = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
];

const usePayout = () => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const contract = useContract({
    ...paymentSplitterContract,
    signerOrProvider: provider,
  });

  const [transactionHash, setTransactionHash] = useState<string>("");
  const [isPayout, setIsPayingout] = useState<boolean>(false);
  const [mintingError, setMintingError] = useState<string>("");

  const prepareOverridesArgsForPayout = async (
    account: string
  ): Promise<IOverrideArgs> => {
    let estimatedGas = 200000;

    if (contract) {
      try {
        const amount = ethers.utils.parseEther("0.001");
        const estimatedGasFromContract = await contract.estimateGas.pay(
          arrayOfPayouts,
          [amount, amount, amount, amount, amount],
          {
            from: account,
            value: ethers.utils.parseEther("0"),
          }
        );
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
    data: payoutData,
    isLoading: payingOut,
    error: payoutError,
    write: payout,
    reset: resetPayout,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...paymentSplitterContract(chain?.id || 5),
    functionName: "pay",
    chainId: chain?.id,
  });

  const processTransaction = async () => {
    if (payoutData) {
      const txnReceipt = await payoutData.wait();
      setTransactionHash(txnReceipt.transactionHash);
      setIsPayingout(false);
    }
  };

  useEffect(() => {
    if (payoutData) {
      processTransaction();
    } else {
      setTransactionHash("");
    }
  }, [payoutData]);

  useEffect(() => {
    setMintingError("");
    if (payingOut) {
      setIsPayingout(true);
    } else {
      if (transactionHash) {
        setIsPayingout(false);
      } else if (payoutError) {
        setMintingError(processErrorMessage(payoutError));
        setIsPayingout(false);
      }
    }
  }, [payingOut]);

  const clearData = () => {
    resetPayout();
    setTransactionHash("");
    setMintingError("");
  };

  return {
    transactionHash,
    isPayout,
    mintingError,
    payout,
    prepareOverridesArgsForPayout,
    clearData,
  };
};

export default usePayout;
