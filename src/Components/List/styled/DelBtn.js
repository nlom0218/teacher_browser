import styled from "styled-components";

export const DelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
