import styled from "styled-components";

export const DashboardViewContainer = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const DashboardViewTitle = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 20px;
`;

export const DashboardViewContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const DashboardViewText = styled.p`
  font-weight: 400;
  font-size: 18px;

  margin: 5px 0;
`;

export const DashboardViewButton = styled.button`
  position: relative;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
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
