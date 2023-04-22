import styled from "styled-components";

export const InvestmentPanelContainer = styled.div`
  position: relative;
  margin: 10px 0;

  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const InvestmentPanelTitle = styled.h2``;

export const InvestmentPanelContent = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-itens: center;
  justify-content: space-between;
`;

export const InvestmentPanelGraph = styled.div`
  position: relative;
  width: 48%;
`;

export const InvestmentPanelAction = styled.div`
  position: relative;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const InvestmentPanelButton = styled.button`
  position: relative;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;

  width: 100%;

  margin: 5px 0;

  background-color: #fffa00;

  & p {
    text-align: center;
    color: black;
    font-weight: 700;
    font-size: 16px;
    padding: 0;
  }
`;

export const InvestmentPanelText = styled.p`
  font-weight: 400;
  font-size: 18px;
  margin: 5px 0;
`;

export const InvestmentPanelInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InvestmentPanelMaxButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 2;

  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;

  margin: 5px 0;

  background-color: #fffa00;

  & p {
    text-align: center;
    color: black;
    font-weight: 700;
    font-size: 16px;
    padding: 0;
  }
`;
