import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const color = {
  black: "#3f3f3f",
  white: "#e8e8e8"
}

export const ligthTheme = {
  fontColor: color.black,
  blurColor: "rgba(232, 232, 232, 0.6)"
}

export const darkTheme = {
  fontColor: color.white,
  bgColor: color.black,
  blurColor: "rgba(63, 63, 63, 0.6)"
}

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    height: 100vh;
    font-size: 1em;
    font-size: 1rem;
    background: url("https://source.unsplash.com/random/1920*1080?nature");
    background-size: cover;
    background-position: center;
    font-family: 'Nanum Gothic', sans-serif;
    color: ${props => props.theme.fontColor};
    transition: color 1s ease;
  }
  * {
    box-sizing: border-box;
    color: ${props => props.theme.fontColor};
    transition: color 1s ease;
  }
  a {
    text-decoration: none;
  }
  input {
    all: unset;
  }
  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto; 
    user-select: auto;
  }
`