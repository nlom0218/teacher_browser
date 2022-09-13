import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../../../styles";
import GenerateQrCode from "../GenerateQrCode";

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
`;
const QrPrintContext = ({ num, imageUrl, picklist }) => {
  const [imgUrl, setImgUrl] = useState("");
  const qrImg = [];
  for (let i = 0; i < num; i++) {
    qrImg.push(<img src={imageUrl} alt="img" value="qrImgValue" width="100px" />);
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
