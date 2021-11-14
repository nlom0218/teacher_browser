import { keyframes } from "styled-components"

export const weatherDown = keyframes`
  from {
    top: -36px;
    top: -2.25rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`

export const weatherUp = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: -36px;
    top: -2.25rem;
  }
`

export const weatherBtnDown = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: 76px;
    top: 4.75rem;
  }
`

export const weatherBtnUp = keyframes`
  from {
    top: 76px;
    top: 4.75rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`