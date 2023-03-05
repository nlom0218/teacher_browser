import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import BtnContainer from "./styled/BtnContainer";
import DelBtn from "./styled/DelBtn";
import DeleteUser from "./Popup/DeleteUser";
import DeleteStudent from "./Popup/DeleteStudent";

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Withdrawal = ({ userEmail, setMsg }) => {
  const isPopup = useReactiveVar(isPopupVar);
  const onClickDelBtn = (type) => {
    if (type === "user") inPopup("deleteUser");
    else inPopup("deleteStudent");
  };

  return (
    <Container>
      <BtnContainer onlyone={true}>
        <DelBtn onClick={() => onClickDelBtn("user")}>계정 삭제 & 회원 탈퇴</DelBtn>
      </BtnContainer>
      <BtnContainer onlyone={true}>
        <DelBtn onClick={() => onClickDelBtn("student")}>학생 관련 데이터 삭제</DelBtn>
      </BtnContainer>
      {isPopup === "deleteUser" && <DeleteUser teacherEmail={userEmail} setMsg={setMsg} />}
      {isPopup === "deleteStudent" && <DeleteStudent teacherEmail={userEmail} setMsg={setMsg} />}
    </Container>
  );
};

export default Withdrawal;
