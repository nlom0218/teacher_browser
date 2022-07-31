import React from "react";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import styled from "styled-components";

const Container = styled.div`
  align-self: flex-end;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const TypeBtn = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    margin-right: 5px;
    margin-right: 0.3125rem;
    display: flex;
  }
`;

const SeeResultType = ({ seeResultType, setSeeResultType }) => {
  const onClickTypeBtn = (type) => {
    setSeeResultType(type);
  };

  return (
    <Container>
      <TypeBtn onClick={() => onClickTypeBtn("ALL")}>
        {seeResultType === "ALL" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        <div>All</div>
      </TypeBtn>
      <TypeBtn onClick={() => onClickTypeBtn("ONE")}>
        {seeResultType === "ONE" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        <div>ONE</div>
      </TypeBtn>
    </Container>
  );
};

export default SeeResultType;
