import React from 'react';
import styled from 'styled-components';
import { FaBars } from "react-icons/fa";

const SideMenu = styled.div`
  display: grid;
  justify-items: flex-end;
  position: relative;
`

const SideBtn = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 5px;
  padding: 0.3125rem;
  background: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  transition: background 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SideContents = styled.div`
  z-index: 1;
  position: absolute;
  top: 35px;
  top: 2.1875rem;
  background-color: ${props => props.theme.fontColor};
  display: grid;
  row-gap: 1px;
  border-radius: 5px;
`

const Content = styled.div`
  padding: 15px 20px;
  background-color: ${props => props.theme.bgColor};
  :first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  :last-child{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const HeaderSideBtn = () => {
  return (
    <SideMenu>
      <SideBtn><FaBars /></SideBtn>
      <SideContents>
        <Content>로그인</Content>
        <Content>회원가입</Content>
      </SideContents>
    </SideMenu>);
}

export default HeaderSideBtn;