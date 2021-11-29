import React from 'react';
import styled from 'styled-components';
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useMe from '../../Hooks/useMe';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, logOutUser } from '../../apollo';

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

const HeaderSideBtn = ({ seeSideMenu, setSeeSideMenu }) => {
  const login = useReactiveVar(isLoggedInVar)
  const navigate = useNavigate()
  const onClickSideBtn = () => {
    setSeeSideMenu(prev => !prev)
  }
  const onClickLogOut = () => {
    logOutUser()
    navigate(routes.home)
  }
  return (
    <SideMenu>
      <SideBtn onClick={onClickSideBtn}><FaBars /></SideBtn>
      {seeSideMenu &&
        <SideContents>
          {login ?
            <React.Fragment>
              <Content onClick={() => navigate(routes.editAccount)}><Link to={routes.editAccount}>회원정보 변경</Link></Content>
              <Content onClick={onClickLogOut}>로그아웃</Content>
            </React.Fragment>
            :
            <React.Fragment>
              <Content onClick={() => navigate(routes.login)}><Link to={routes.login}>로그인</Link></Content>
              <Content onClick={() => navigate(routes.createAccount)}><Link to={routes.createAccount}>회원가입</Link></Content>
            </React.Fragment>
          }
        </SideContents>
      }
    </SideMenu>);
}

export default HeaderSideBtn;