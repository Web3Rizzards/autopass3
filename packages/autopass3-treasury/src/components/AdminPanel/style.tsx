import styled from "styled-components";

export const AdminPanelContainer = styled.div`
  position: relative;
  margin: 10px 0;

  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const AdminPanelTitle = styled.h2``;

export const AdminPanelDescription = styled.p``;

export const AdminPanelForm = styled.div`
  position: relative;

  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AdminPanelSetButton = styled.button`
  position: relative;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;

  margin: 5px;

  background-color: #fffa00;

  & p {
    text-align: center;
    color: black;
    font-weight: 700;
    font-size: 16px;
    padding: 0;
  }
`;
