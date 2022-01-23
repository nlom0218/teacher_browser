import { keyframes } from "styled-components";

export const hideWelcomeSection = keyframes`
  from {
    right: 0;
    left: 0;
  }
  to {
    right: 100%;
    left: -100%;
  }
`

export const seeWelcomSection = keyframes`
  from {
    right: 100%;
    left: -100%;
  }
  to {
    right: 0;
    left: 0;
  }
`

export const hideNewsSection = keyframes`
  from {
    right: 0;
    left: 0;
  }
  to {
    right: -100%;
    left: 100%;
  }
`

export const seeNewsSection = keyframes`
  from {
    right: -100%;
    left: 100%;
  }
  to {
    right: 0;
    left: 0;
  }
`