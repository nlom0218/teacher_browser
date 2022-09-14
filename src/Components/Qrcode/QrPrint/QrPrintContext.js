import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../../../styles";
import GenerateQrCode from "../GenerateQrCode";

const GridList = styled.div`
  display: grid;
  text-align: center;

  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  color: ${color.black};
  img {
    width: 100px;
  }
`;
const QrPrintContext = ({ num, imageUrl, picklist }) => {
  const [imgUrl, setImgUrl] = useState("");

  const qrImg = [];
  const qrImgR = [];

  if (imageUrl) {
    for (let i = 0; i < num; i++) {
      qrImgR.push(<img src={imageUrl} alt="img" value="qrImgValue" width="100px" />);
    }
  }
  if (picklist) {
    for (let i = 0; i < num; i++) {
      qrImg.push(
        <div>
          {picklist.map((item, index) => {
            return (
              <div key={index}>
                <GenerateQrCode
                  key={index}
                  imageUrl={imgUrl}
                  setImageUrl={setImgUrl}
                  url={item.url}
                  title={item.title}
                />
              </div>
            );
          })}
        </div>,
      );
    }
  }
  return (
    <GridList num={num}>
      {imageUrl ? qrImgR : null}
      {picklist ? qrImg : null}
    </GridList>
  );
};

export default QrPrintContext;
