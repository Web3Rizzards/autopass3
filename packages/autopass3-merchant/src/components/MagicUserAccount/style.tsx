import styled from "styled-components";

export const UserAccountContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const UserAccountButton = styled.button`
  position: relative;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;

  margin: 5px;

  background-color: #fffa00;

  & p {
    color: black;
    font-weight: 700;
    font-size: 16px;
    padding: 0;
  }
`;

export const UserAccountText = styled.div`
  position: relative;
  border: none;
  border-radius: 15px;
  padding: 10px;

  margin: 5px;

  background-color: #fffa00;

  cursor: default;

  & p {
    color: black;
    font-weight: 700;
    font-size: 16px;
    padding: 0;
  }
`;

export const UserAccountInputContainer = styled.div`
  position: relative;
  width: 200px;
`;
