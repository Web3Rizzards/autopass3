import styled from "styled-components";

export const MerchantPanelContainer = styled.div`
  position: relative;
  margin: 10px 0;
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MerchantPanelBar = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MerchantPanelTitle = styled.h2``;

export const MerchantPanelButton = styled.button`
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
  }
`;

export const MerchantPanelData = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MerchantPanelDataHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 5px;

  & p {
    font-weight: 400;
    font-size: 14px;
  }
`;

export const MerchantPanelDataContent = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MerchantPanelDataRow = styled.div`
  position: relative;
  width: 100%;

  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 5px;

  margin: 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
