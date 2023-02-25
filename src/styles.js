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
  ligthRed: "#fc8876",
  boxShadow: "0px 17px 6px -14px rgba(0,0,0,0.6)",
  blurYelloColor: "rgba(255, 252, 86, 0.2)",
};

export const ligthTheme = {
  originBgColor: "#ffffff",
  fontColor: color.black,
  bgColor: color.white,
  blurColor: "rgba(230, 230, 230, 0.8)",
  blurFontColor: "rgba(0, 0, 0, 0.4)",
  redColor: color.red,
  contentBgColor: color.gray,
  btnBgColor: color.blue,
  popupBgColor: "rgba(0,0,0,0.75)",
  hoverColor: "#d6d6d6",
  cardBg: "rgba(247,247,247,0.8)",
  cardHoverBg: "rgba(10,10,10,0.9)",
  cardBorder: "rgba(160,160,160,1)",
  purple: "#ecbdfc",
  textAniColor: "linear-gradient(92deg, #1c5b8e, #db3a1e)",
  green: "#007f4c",
  originBgColor: "#ffffff",
  girdBorderColor: "rgb(181, 181, 181)",
  yelloColor: "rgba(244, 242, 90, 0.8)",
  skyblue: "#CEECF5",
};
export const darkTheme = {
  originBgColor: "#222222",
  fontColor: color.white,
  bgColor: color.black,
  blurColor: "rgba(60, 60, 60, 0.8)",
  blurFontColor: "rgba(250, 250, 250, 0.4)",
  redColor: color.ligthRed,
  contentBgColor: color.maroon,
  btnBgColor: color.lightBlue,
  popupBgColor: "rgba(200,200,200,0.8)",
  hoverColor: color.maroon,
  cardBg: "rgba(10,10,10,0.8)",
  cardHoverBg: "rgba(247,247,247,1)",
  cardBorder: "rgba(120,120,120,1)",
  purple: "#6b018c",
  textAniColor: "linear-gradient(92deg, #7CC6FF, #fc8876)",
  green: "#20c997",
  originBgColor: "#000000",
  girdBorderColor: color.maroon,
  yelloColor: "rgba(112, 108, 0, 0.8)",
  skyblue: "#478b9e",
};

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    height: 100vh;
    font-size: 1em;
    font-size: 1rem;
    background: ${({ bgTheme, theme }) =>
      bgTheme
        ? bgTheme.substr(0, 1) === "#"
          ? bgTheme
          : `url("https://source.unsplash.com/random/1920x1080?${bgTheme}")`
        : theme.bgColor};
    background: ${(props) => !props.isLoggedIn && `url("https://source.unsplash.com/random/1920x1080?nature")`};
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

  @font-face {
    font-family: "TTTtangsbudaejjigaeB";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/TTTtangsbudaejjigaeB.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'KimjungchulMyungjo-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulMyungjo-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'RixMomsBlanketR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/RixMomsBlanketR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'KCCMurukmuruk';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCCMurukmuruk.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Dovemayo_wild';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/Dovemayo_wild.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Ansungtangmyun-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ansungtangmyun-Bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'OTWelcomeRA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeRA.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'KOTRAHOPE';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Hahmlet-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
`;
