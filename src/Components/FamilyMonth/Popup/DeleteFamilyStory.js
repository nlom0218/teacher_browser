import React from "react";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import styled from "styled-components";
import { outPopup } from "../../../apollo";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  .family_story_btn {
    padding: 10px 0px;
    padding: 0.625rem 0rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    text-align: center;
    cursor: pointer;
  }
`;

const Msg = styled.div`
  text-align: center;
  line-height: 160%;
`;

const DeleteBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const CancelBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const DeleteFamilyStory = () => {
  const onClickCancelBtn = () => {
    outPopup();
  };

  return (
    <BtnPopupContainer>
      <Container>
        <Msg>
          삭제된 가정의 달 이야기는 다시 복구될 수 없습니다. <br />
          삭제하시겠습니까?
        </Msg>
        <DeleteBtn className="family_story_btn">삭제하기</DeleteBtn>
        <CancelBtn onClick={onClickCancelBtn} className="family_story_btn">
          취소하기
        </CancelBtn>
      </Container>
    </BtnPopupContainer>
  );
};

export default DeleteFamilyStory;
