import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { logOutUser, outPopup } from "../../../apollo";
import { DELETE_USER_MUTATION } from "../../../Graphql/User/mutation";
import routes from "../../../routes";
import { customMedia } from "../../../styles";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  ${customMedia.greaterThan("desktop")`
    justify-items: center;
  `}
`;

const Btn = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  div {
    padding: 12px 40px;
    padding: 0.75rem 2.5rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    text-align: center;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const DelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
`;

const DeleteUser = ({ teacherEmail, isOwn }) => {
  const onCompleted = (result) => {
    const {
      deleteUser: { ok },
    } = result;
    if (ok) {
      outPopup();
      navigate(routes.home);
      logOutUser(() => window.location.reload());
    }
  };
  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, { onCompleted });
  const navigate = useNavigate();
  const onClickDelBtn = () => {
    if (loading) return;
    if (!teacherEmail) {
      window.alert("오류가 발생하였습니다. 취소 후 다시 시도하세요. 계속 될 경우 관리자에게 문의 부탁드립니다.");
      return;
    }
    deleteUser({ variables: { teacherEmail } });
  };
  return (
    <BtnPopupContainer>
      {isOwn && (
        <Container>
          <Btn>
            <DelBtn onClick={onClickDelBtn}>탈퇴하기</DelBtn>
            <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
          </Btn>
          <Msg>모든 정보를 삭제하고 탈퇴하시겠습니까?</Msg>
          <Msg>정보가 삭제되면 다시 복구할 수 없습니다.</Msg>
        </Container>
      )}
      {isOwn || (
        <Container>
          <Btn>
            <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
            <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
          </Btn>
          <Msg>모든 정보를 삭제하고 초기화하시겠습니까?</Msg>
          <Msg>정보가 삭제되면 다시 복구할 수 없습니다.</Msg>
        </Container>
      )}
    </BtnPopupContainer>
  );
};

export default DeleteUser;
