import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import styled from 'styled-components';
import { FcAlarmClock, FcDonate, FcRefresh, FcNumericalSorting12 } from "react-icons/fc";
import { GiForkKnifeSpoon, GiNotebook } from "react-icons/gi";
import { BsTable } from "react-icons/bs";
import { customMedia } from '../styles';
import { Link } from 'react-router-dom';
import routes from '../routes';
import { FaUserEdit } from 'react-icons/fa';

const Container = styled.div`
 width: 100%;
 display: grid;
 grid-template-columns: 1fr 1fr;
 row-gap: 60px;
 row-gap: 3.75rem;
 column-gap: 30px;
 column-gap: 1.875rem;
 align-content: flex-start;
 justify-items: center;
 padding: 20px;
 padding: 1.25rem;
 ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
    `}
   ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  `}
`

const SMenu = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  color: ${props => props.theme.fontColor};
  transition: color 1s ease;
  cursor: pointer;
  svg {
    margin: 0 auto;
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const Title = styled.div`
  font-weight: 600;
`

const Menu = () => {
  return (<BasicContainer>
    <Container>
      <Link to={routes.timer}>
        <SMenu>
          <FcAlarmClock />
          <Title>타이머</Title>
        </SMenu>
      </Link>
      <Link to={routes.draw}>
        <SMenu>
          <FcDonate />
          <Title>랜덤뽑기</Title>
        </SMenu>
      </Link>
      <Link to={routes.swap}>
        <SMenu>
          <FcRefresh />
          <Title>자리바꾸기</Title>
        </SMenu>
      </Link>
      <Link to={routes.order}>
        <SMenu>
          <FcNumericalSorting12 />
          <Title>순서정하기</Title>
          {/* 급식순서 -> 순서정하기 */}
        </SMenu>
      </Link>
      <Link to={routes.lunchmenu}>
        <SMenu>
          <GiForkKnifeSpoon />
          <Title>식단표</Title>
        </SMenu>
      </Link>
      <Link to={routes.schedule}>
        <SMenu>
          <BsTable />
          <Title>시간표</Title>
        </SMenu>
      </Link>
      <Link to={routes.journal}>
        <SMenu>
          <GiNotebook />
          <Title>학급일지</Title>
        </SMenu>
      </Link>
      <Link to={routes.editAccount}>
        <SMenu>
          <FaUserEdit />
          <Title>회원정보 변경</Title>
        </SMenu>
      </Link>
    </Container>
  </BasicContainer>);
}

export default Menu;