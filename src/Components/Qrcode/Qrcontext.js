import React, { useState } from "react";
import styled from "styled-components";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";

const Storages = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 5fr;
  background: ${(props) => props.theme.cardBg};
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
`;

const Check = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Body = styled.div`
  display: grid;
  width: 130px;
  height: 130px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
`;

const Subject = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 90%;
  height: 100px;
  row-gap: 6x;
  row-gap: 0.375rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
  padding: 10px;
  padding: 0.625rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  font-weight: 600;
  align-self: center;
`;
const Url = styled.div`
  width: 100%;
  font-size: 0.8em;
  font-size: 0.8rem;
  text-align: left;
  overflow: hidden;
`;

const Qrcontext = () => {
  const [pick, setPick] = useState(false);
  const onClickPick = () => {
    setPick(!pick);
  };
  return (
    <Storages>
      {" "}
      <Check onClick={onClickPick}>
        <div>{pick === true ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
      </Check>
      <Body />
      <Subject>
        <Title>티처캔</Title>
        <Url>https://www.teachercan.com</Url>
      </Subject>
    </Storages>
  );
};
export default Qrcontext;
