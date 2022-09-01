import React from "react";
import styled from "styled-components";
import { color } from "../../../styles";

const GridList = styled.div`
  display: grid;
  /* grid-template-columns: ${(props) => `repeat(${props.pickNum}, 1fr)`}; */
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
  /* column-gap: ${(props) => props.seatType === 2 && "0px"}; */
  /* column-gap: ${(props) => props.seatType === 2 && "0rem"}; */
`;

const QrPrintContext = ({ url }) => {
  return (
    <GridList>
      <div>{url}</div>
    </GridList>
  );
};

export default QrPrintContext;
