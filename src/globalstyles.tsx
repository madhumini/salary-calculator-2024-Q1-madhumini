import { createGlobalStyle } from "styled-components";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
   font-family: ${inter.style.fontFamily};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
