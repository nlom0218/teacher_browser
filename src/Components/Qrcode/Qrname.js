import React from "react";
import { outPopup } from "../../apollo";
import PopupContainer from "../Shared/PopupContainer";
import styled from "styled-components";

const Frame = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr 3);
  height: 200px;
  justify-items: center;
`;
const Name = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  font-weight: 600;
  justify-self: left;
  margin-top: 40px;
  margin-top: 2.5rem;
`;
const InputName = styled.input`
  width: 100%;
  font-size: 1.25em;
  font-size: 1.25rem;
  padding: 10px;
  padding: 0.625rem;
  margin: 10px 20px;
  margin: 0.625rem 1.25rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardBg};
`;
const NameBtn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  margin: 10px;
  margin: 0.625rem;
  width: 150px;
  height: 40px;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const Qrname = ({ setMode }) => {
  const onClickBtn = () => {
    setMode("storage");
    outPopup();
  };
  return (
    <PopupContainer>
      <Frame>
        <Name>QR코드 이름</Name>
        <InputName placeholder="(예)티처캔" autoComplete="off" />
        <NameBtn onClick={onClickBtn}>저장</NameBtn>
      </Frame>
    </PopupContainer>
  );
};

export default Qrname;
