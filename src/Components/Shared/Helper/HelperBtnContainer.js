import React from "react";
import styled from "styled-components";
import { outPopup } from "../../../apollo";

const BtnContainer = styled.div`
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const OutPopupBtn = styled.div`
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.redColor};
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const NumBtn = styled.div`
  display: flex;
`;

const NumBox = styled.div`
  :not(:last-child) {
    margin-right: 20px;
    margin-right: 1.25rem;
  }
  width: 24px;
  width: 1.5rem;
  height: 24px;
  height: 1.5rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
`;

const HelperBtnContainer = ({ imgArr, onClickNum }) => {
  const onClickOutPopup = () => {
    outPopup();
  };
  return (
    <BtnContainer>
      {!imgArr && <div></div>}
      {imgArr && (
        <NumBtn>
          {imgArr.map((item, index) => {
            return (
              <NumBox key={index} onClick={() => onClickNum(item)}>
                {item}
              </NumBox>
            );
          })}
        </NumBtn>
      )}
      <OutPopupBtn onClick={onClickOutPopup}>나가기</OutPopupBtn>
    </BtnContainer>
  );
};

export default HelperBtnContainer;
