import React from "react";
import styled from "styled-components";
import { customMedia } from "../../../styles";

const PageLinkList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-column: ${(props) => props.none && 1 / 3}; */
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  ${customMedia.greaterThan("desktop")`
  grid-template-columns: repeat(4,1fr);

`}
`;

export default PageLinkList;
