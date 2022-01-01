import { createGlobalStyle } from "styled-components";
import { generateMedia } from "styled-media-query";
import reset from "styled-reset";

export const customMedia = generateMedia({
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
});

export const color = {
  black: "#282828",
  white: "#e8e8e8",
  gray: "#e2e2e2",
  maroon: "#555555",
  blue: "#1c5b8e",
  lightBlue: "#7CC6FF",
  red: "#db3a1e",
  ligthRed: "#ef624c",
  boxShadow: "0px 17px 6px -14px rgba(0,0,0,0.6)",
};

export const ligthTheme = {
  fontColor: color.black,
  bgColor: color.white,
  blurColor: "rgba(230, 230, 230, 0.6)",
  redColor: color.red,
  contentBgColor: color.gray,
  btnBgColor: color.blue,
  popupBgColor: "rgba(0,0,0,0.75)",
  hoverColor: "#d6d6d6",
  cardBg: "rgba(247,247,247,0.8)",
  cardHoverBg: "rgba(10,10,10,0.9)",
  cardBorder: "rgba(200,200,200,1)"
}
export const darkTheme = {
  fontColor: color.white,
  bgColor: color.black,
  blurColor: "rgba(60, 60, 60, 0.6)",
  redColor: color.ligthRed,
  contentBgColor: color.maroon,
  btnBgColor: color.lightBlue,
  popupBgColor: "rgba(200,200,200,0.75)",
  hoverColor: color.maroon,
  cardBg: "rgba(10,10,10,0.8)",
  cardHoverBg: "rgba(247,247,247,1)",
  cardBorder: "rgba(120,120,120,1)"
}

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    height: 100vh;
    font-size: 1em;
    font-size: 1rem;
    background: ${({ bgTheme }) =>
    bgTheme
      ? `url("https://source.unsplash.com/random/1920*1080?${bgTheme}")`
      : `url("https://source.unsplash.com/random/1920*1080?nature")`};
    background-size: cover;
    background-position: center;
    font-family: 'Nanum Gothic', sans-serif;
    color: ${(props) => props.theme.fontColor};
    transition: color 1s ease;
  }
  * {
    box-sizing: border-box;
    /* user-select: none; */
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColor};
    transition: color 1s ease;
  }
  input {
    all: unset;
    box-sizing: border-box;
  }
  input, textarea {
    /* -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto; 
    user-select: auto; */
  }
`;
