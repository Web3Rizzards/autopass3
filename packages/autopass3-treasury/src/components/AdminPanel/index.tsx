import { useState } from "react";
import TextField from "../TextField";
import {
  AdminPanelContainer,
  AdminPanelDescription,
  AdminPanelForm,
  AdminPanelSetButton,
  AdminPanelTitle,
} from "./style";

const AdminPanel = () => {
  const currentPlatformFee = 1;

  const [platformFee, setPlatformFee] = useState<string>();

  const handlePlatformChange = (text: string) => {
    setPlatformFee(text);
  };

  const handlePlatformSet = () => {
    console.log("Setting new platform fees");
  };

  return (
    <AdminPanelContainer>
      <AdminPanelTitle>Admin</AdminPanelTitle>
      <AdminPanelDescription>
        Platform Fee: {currentPlatformFee}%
      </AdminPanelDescription>
      <AdminPanelForm>
        <TextField
          label="Platform Fee"
          type="number"
          handleChange={handlePlatformChange}
        />
        <AdminPanelSetButton onClick={handlePlatformSet}>
          <p>SET</p>
        </AdminPanelSetButton>
      </AdminPanelForm>
    </AdminPanelContainer>
  );
};

export default AdminPanel;
