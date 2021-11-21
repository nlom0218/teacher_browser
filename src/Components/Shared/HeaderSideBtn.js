import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../routes';

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
  /* background-color: ${props => props.theme.fontColor}; */
  display: grid;
  row-gap: 1px;
  border-radius: 5px;
`

const Content = styled.div`
  padding: 15px 60px 15px 20px;
  padding: 0.9375rem 3.75rem 0.9375rem 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  background-color: ${props => props.theme.blurColor};
  transition: 1s ease background-color;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.bgColor};
    transition: 0.6s ease background-color;
  }
  :first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
  }
  :last-child{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 0.3125rem;
    border-bottom-right-radius: 0.3125rem;
  }
`

const HeaderSideBtn = () => {
  const navigate = useNavigate()
  const [seeSideMenu, setSeeSideMenu] = useState(false)
  const onClickSideBtn = () => {
    setSeeSideMenu(prev => !prev)
  }
  const onClickContent = (route) => {
    if (route = "login") {
      navigate(routes.login)
    } else if (route = "createAccount") {
      navigate(routes.createAccount)
    }
  }
  return (
    <SideMenu>
      <SideBtn onClick={onClickSideBtn}><FaBars /></SideBtn>
      {seeSideMenu && <SideContents>
        <Content onClick={() => onClickContent("login")}><Link to={routes.login}>로그인</Link></Content>
        <Content onClick={() => onClickContent("createAccount")}><Link to={routes.createAccount}>회원가입</Link></Content>
      </SideContents>}
    </SideMenu>);
}

export default HeaderSideBtn;