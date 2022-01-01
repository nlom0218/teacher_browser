import React from 'react';
import styled from 'styled-components';
import { isPopupVar } from '../apollo';
import EditSchool from '../Components/Account/EditSchool';
import EditBgTheme from "../Components/Account/EditBgTheme";
import RegisterSchool from '../Components/Account/RegisterSchool';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from '../Hooks/useMe';
import { color, customMedia } from '../styles';
import { useReactiveVar } from '@apollo/client';

const Container = styled.div`
  padding: 60px 0px;
  padding: 3.75rem 0rem;
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
  background-color: ${(props) => props.theme.contentBgColor};
  transition: background-color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
`;

const EditAccount = () => {
  const isPopup = useReactiveVar(isPopupVar)
  const me = useMe();
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Changes>
          <List>이메일</List>
          <Item>{me?.email}</Item>
        </Changes>
        <Changes>
          <List>학교정보</List>
          <Item>
            <EditSchool
              userEmail={me?.email}
              schoolName={me?.schoolName}
              schoolAdress={me?.schoolAdress}
            />
          </Item>
        </Changes>
        <Changes>
          <List>배경화면 테마</List>
          <Item>
            <EditBgTheme userEmail={me?.email} bgTheme={me?.bgTheme} />
          </Item>
        </Changes>
      </Container>
      {isPopup === "registerSchool" && (
        <RegisterSchool />
      )}
    </BasicContainer>
  );
};

export default EditAccount;
