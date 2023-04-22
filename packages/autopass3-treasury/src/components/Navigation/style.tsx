import styled from "styled-components";

export const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;

  z-index: 2;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: #fffa00;
`;

export const NavigationContent = styled.div`
  position: relative;
  width: 80%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationIcon = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
`;
