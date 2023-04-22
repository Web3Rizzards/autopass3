import { useState } from "react";
import { SubmitAddressButton, SubmitAddressContainer } from "./style";
import TextField from "../TextField";

const SubmitAddress = () => {
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

  const handleSubmission = () => {
    console.log({
      companyName,
      companyRegistrationNo,
      companyAddress,
    });
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
