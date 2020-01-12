import "react-toastify/dist/ReactToastify.min.css";
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,500,500i,700,700i,900,900i&display=swap');

  body {
    font-family: "Muli", "sans-serif";
    background-color: ${colors.bodyBackground};
    margin: 0;
  }
`;

export default GlobalStyle;
