import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import routes from "../../../routes";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
`;

const Text = styled.div`
  grid-column: 1 / -1;
  color: ${(props) => props.theme.bgColor};
`;

const Btn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const MoveStudentPage = () => {
  const studentId = localStorage.getItem("summaryStudentId");

  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`${routes.list}/student/${studentId}`);
    localStorage.removeItem("summaryStudentId");
    outPopup();
  };

  const onClickJournal = () => {
    navigate(`${routes.journal}/student/${studentId}`);
    localStorage.removeItem("summaryStudentId");
    outPopup();
  };

  return (
    <BtnPopupContainer>
      <Container>
        <Text>학급일지 또는 학생정보 페이지로 이동합니다.</Text>
        <Btn onClick={onClickJournal}>학급일지로 이동</Btn>
        <Btn onClick={onClickDetail}>학생정보로 이동</Btn>
      </Container>
    </BtnPopupContainer>
  );
};

export default MoveStudentPage;
