import React, { useState } from "react";
import styled from "styled-components";
import { isPopupVar } from "../apollo";
import EditSchool from "../Components/Account/EditSchool";
import EditBgTheme from "../Components/Account/EditBgTheme";
import RegisterSchool from "../Components/Account/RegisterSchool";
import Withdrawal from "../Components/Account/Withdrawal";
import BasicContainer from "../Components/Shared/BasicContainer";
import ChangePw from "../Components/Account/ChangePw";
import ChangeNickname from "../Components/Account/ChangeNickname";
import useMe from "../Hooks/useMe";
import { color, customMedia } from "../styles";
import { useReactiveVar } from "@apollo/client";
import Pop_ChangePw from "../Components/Account/Popup/Pop_ChangePw";
import Pop_ChangeNickname from "../Components/Account/Popup/Pop_ChangeNickname";
import { CHECK_PASSWORD_QUERY } from "../Graphql/User/query";
import { useQuery } from "@apollo/client";
import useTitle from "../Hooks/useTitle";
import AlertMessage from "../Components/Shared/AlertMessage";
import EditDDay from "../Components/Account/EditDDay";
import Loading from "../Components/Shared/Loading";

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 60px 0px 60px 60px;
  padding: 3.75rem 0rem 3.75rem 3.75rem;
`;

const Container = styled.div`
  padding-bottom: 60px;
  padding-bottom: 3.75rem;
  width: 90%;
  margin: 0 auto;
  display: grid;
  align-items: flex-start;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    width: 80%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%
  `}
`;

const Changes = styled.div`
  display: grid;
  align-items: start;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 2fr;
  `}
  ${customMedia.greaterThan("desktop")`
  `}
`;

const List = styled.div`
  font-weight: 600;
  letter-spacing: 3px;
  letter-spacing: 0.1875rem;
`;

const Item = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
`;

const EditAccount = () => {
  const titleUpdataer = useTitle("티처캔 | 회원정보");
  const isPopup = useReactiveVar(isPopupVar);

  const [msg, setMsg] = useState(undefined);
  const [errMsg, setErrMsg] = useState(undefined);

  const me = useMe();

  const { data } = useQuery(CHECK_PASSWORD_QUERY, {
    variables: { userEmail: me?.email },
    skip: !me,
  });

  if (!me) {
    return <Loading page="subPage" />;
  }

  return (
    <BasicContainer menuItem={true}>
      <Title>회원정보</Title>
      <Container>
        <Changes>
          <List>이메일</List>
          <Item>
            {data?.checkPw.ok || me?.email}
            {data?.checkPw.ok && <ChangePw userEmail={me?.email}></ChangePw>}
          </Item>
        </Changes>
        <Changes>
          <List>닉네임</List>
          <Item>
            {me?.nickname || "닉네임을 등록해 주세요"}
            {<ChangeNickname userEmail={me?.email}></ChangeNickname>}
          </Item>
        </Changes>
        <Changes>
          <List>학교정보</List>
          <Item>
            <EditSchool
              setMsg={setMsg}
              schoolName={me?.schoolName}
              schoolAdress={me?.schoolAdress}
              userEmail={me?.email}
            />
          </Item>
        </Changes>
        {/* <Changes>
          <List>D-DAY</List>
          <Item>
            <EditDDay
              dDay={me?.dDay}
              setErrMsg={setErrMsg}
              userEmail={me?.email}
            />
          </Item>
        </Changes> */}
        <Changes>
          <List>배경화면 테마</List>
          <Item>
            <EditBgTheme setMsg={setMsg} userEmail={me?.email} bgTheme={me?.bgTheme} userId={me?._id} />
          </Item>
        </Changes>
        <Changes>
          <List>회원 탈퇴</List>
          <Withdrawal userEmail={me?.email} isOwn={true} setMsg={setMsg} />
        </Changes>
      </Container>
      {isPopup === "registerSchool" && <RegisterSchool setMsg={setMsg} />}
      {isPopup === "changePw" && <Pop_ChangePw userEmail={me?.email} />}
      {isPopup === "changeNickname" && <Pop_ChangeNickname userEmail={me?.email} nickname={me?.nickname} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} time={3000} type="success" />}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} time={3000} type="error" />}
    </BasicContainer>
  );
};

export default EditAccount;
