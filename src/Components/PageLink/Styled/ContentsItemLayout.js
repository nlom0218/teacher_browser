import React from "react";
import styled from "styled-components";

const ContentsItemLayout = styled.div`
  height: 120px;
  height: 10rem;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: ${(props) => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: ${(props) => (props.isBottom ? "20px" : "0px")};
  row-gap: ${(props) => (props.isBottom ? "1.25rem" : "0rem")};
  padding: 20px;
  padding: 1.25rem;
  position: relative;
`;

export default ContentsItemLayout;
