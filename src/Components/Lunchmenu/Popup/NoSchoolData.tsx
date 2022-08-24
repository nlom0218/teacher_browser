import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { inPopup, outPopup } from "../../../apollo";
import routes from "../../../routes";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Container = styled.div`
  color: ${(props) => props.theme.bgColor};
  display: grid;
  text-align: center;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Btn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.btnBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const NoSchoolData = () => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(routes.editAccount);
    inPopup("registerSchool");
  };

  return (
    <BtnPopupContainer>
      <Container>
        <div>등록된 학교가 없습니다.</div>
        <div>학교를 등록하시겠습니까?</div>
        <Btn onClick={onClickBtn}>학교 등록하기</Btn>
        <CancelBtn onClick={() => outPopup()}>취소하기</CancelBtn>
      </Container>
    </BtnPopupContainer>
  );
};

export default NoSchoolData;
