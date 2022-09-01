import React, { useContext } from "react";
import styled from "styled-components";
import { color } from "../../../styles";
import { QrcodeUrlContext } from "../QrcodeUrlContext";

const GridList = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.num}, 1fr)`};
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
  border: 1px solid;
  /* column-gap: ${(props) => props.num === 2 && "0px"};
  column-gap: ${(props) => props.num === 2 && "0rem"}; */
`;

const QrPrintContext = ({ num }) => {
  const { imageUrl } = useContext(QrcodeUrlContext);
  return <GridList num={num}> {imageUrl ? <img src={imageUrl} alt="img" value="qrImgValue" /> : null} </GridList>;
};

export default QrPrintContext;
