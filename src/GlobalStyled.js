import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  Padding_main: "18px",
};

export const GlobalStyled = createGlobalStyle`
${reset}

*{box-sizing: border-box;
}

@font-face {
  font-family: 'GalmuriMono9';
  src: url('%PUBLIC_URL%/fonts/GalmuriMono9.ttf') format('opentype');
  font-style: normal;
  font-weight: 300;
}

body{
  background-color: #fff;
  color: #000;
  font-family: "Jersey 10", serif, "GalmuriMono9";
  font-weight: 400;
  font-style: normal;
  
}

img{
  width: 100%;
  display: block;
}

a{
  text-decoration: none;
}

ul, li{
  list-style: none;
}
`;
