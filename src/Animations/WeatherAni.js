import { keyframes } from "styled-components";

export const weatherDown = keyframes`
  from {
    top: -30px;
    top: -1.875rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`;

export const weatherUp = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: -30px;
    top: -1.875rem;
  }
`;

export const weatherBtnDown = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: 70px;
    top: 4.375rem;
  }
`;

export const weatherBtnUp = keyframes`
  from {
    top: 70px;
    top: 4.375rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`;
