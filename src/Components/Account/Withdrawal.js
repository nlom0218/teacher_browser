import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import BtnContainer from "./styled/BtnContainer";
import DelBtn from "./styled/DelBtn";
import DeleteUser from "./Popup/DeleteUser";

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Withdrawal = ({ userEmail, isOwn }) => {
  const isPopup = useReactiveVar(isPopupVar);
  const onClickDelBtn = () => {
    inPopup("deleteUser");
  };

  return (
    <Container>
      {isOwn && (
        <BtnContainer onlyone={true}>
          <DelBtn onClick={onClickDelBtn}>계정 삭제 & 회원 탈퇴</DelBtn>
        </BtnContainer>
      )}
      {isOwn || (
        <BtnContainer onlyone={true}>
          <DelBtn onClick={onClickDelBtn}>모든 데이터 삭제</DelBtn>
        </BtnContainer>
      )}

      {isPopup === "deleteUser" && <DeleteUser teacherEmail={userEmail} isOwn={isOwn} />}
    </Container>
  );
};

export default Withdrawal;
