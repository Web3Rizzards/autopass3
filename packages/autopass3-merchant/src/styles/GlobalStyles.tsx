import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;

    background: #FFFFFFF;
  }

  a {
    text-decoration-line: none !important;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;
