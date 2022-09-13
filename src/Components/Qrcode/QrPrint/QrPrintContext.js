import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../../../styles";
import GenerateQrCode from "../GenerateQrCode";

const GridList = styled.div`
  display: grid;
  /* grid-template-columns: ${(props) => `repeat(${props.num}, 1fr)`}; */
  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
  /* column-gap: ${(props) => props.num === 2 && "0px"};
  column-gap: ${(props) => props.num === 2 && "0rem"}; */
`;
const QrPrintContext = ({ num, imageUrl, picklist }) => {
  const [imgUrl, setImgUrl] = useState("");
  const qrImg = [];
  for (let i = 0; i < num; i++) {
    qrImg.push(<img src={imageUrl} alt="img" value="qrImgValue" />);
  }

  return (
    <GridList num={num}>
      {imageUrl ? qrImg : null}
      {picklist?.map((item, index) => {
        return (
          <GenerateQrCode key={index} imageUrl={imgUrl} setImageUrl={setImgUrl} url={item.url} title={item.title} />
        );
      })}
    </GridList>
  );
};

export default QrPrintContext;
