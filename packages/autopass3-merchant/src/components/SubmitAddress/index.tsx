import { useState } from "react";
import { SubmitAddressButton, SubmitAddressContainer } from "./style";
import TextField from "../TextField";
import { useWeb3Auth } from "@/context/Web3Auth";
import { ethers } from "ethers";

const SubmitAddress = () => {
  const { state } = useWeb3Auth();
  const [companyName, setCompanyName] = useState<string>();
  const [companyRegistrationNo, setCompanyRegistrationNo] = useState<string>();
  const [companyAddress, setCompanyAddress] = useState<string>();

  const handleName = (text: string) => {
    setCompanyName(text);
  };

  const handleRegistration = (text: string) => {
    setCompanyRegistrationNo(text);
  };

  const handleAddress = (text: string) => {
    setCompanyAddress(text);
  };

  const handleSubmission = async () => {
    const domain = {
      name: "Autopass3-Merchant",
      version: "1",
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    } as const;

    const types = {
      Merchant: [
        { name: "merchantId", type: "string" },
        { name: "wallet", type: "address" },
      ],
    } as any;

    const value = {
      merchantId: companyRegistrationNo,
      wallet: state.address,
    } as const;

    if (state.provider) {
      const ethersProvider = new ethers.providers.Web3Provider(state.provider);
      const signer = ethersProvider.getSigner();
      const signature = await signer._signTypedData(domain, types, value);
    }
  };

  return (
    <SubmitAddressContainer>
      <TextField label="Company Name" type="text" handleChange={handleName} />
      <TextField
        label="Company Registration Number"
        type="text"
        handleChange={handleRegistration}
      />
      <TextField
        label="Company Address"
        type="text"
        handleChange={handleAddress}
      />
      <SubmitAddressButton onClick={handleSubmission}>
        <p>Submit Address to Autopass</p>
      </SubmitAddressButton>
    </SubmitAddressContainer>
  );
};

export default SubmitAddress;
