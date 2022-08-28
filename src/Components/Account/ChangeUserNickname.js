import React from "react";
import styled from "styled-components";
import { inPopup } from "../../apollo";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
`;

const EditBtn = styled.div`
  padding: 10px 20px;
  text-align: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const ChangeUserNickname = ({ userNickname }) => {
  const onClickBtn = () => {
    inPopup("changeUserNickname");
  };

  return (
    <Container>
      <div>{userNickname}</div>
      <EditBtn onClick={onClickBtn}>{userNickname ? "닉네임 수정" : "닉네임 등록"}</EditBtn>
    </Container>
  );
};

export default ChangeUserNickname;
