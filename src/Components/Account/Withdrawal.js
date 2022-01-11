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

const Withdrawal = ({ userEmail }) => {
  const isPopup = useReactiveVar(isPopupVar);
  const onClickDelBtn = () => {
    inPopup("deleteUser");
  };

  return (
    <Container>
      <BtnContainer onlyone={true}>
        <DelBtn onClick={onClickDelBtn}>계정 삭제 & 회원 탈퇴</DelBtn>
      </BtnContainer>
      {isPopup === "deleteUser" && <DeleteUser teacherEmail={userEmail} />}
    </Container>
  );
};

export default Withdrawal;
