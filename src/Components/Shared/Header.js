import React from 'react';
import styled from 'styled-components';
import useMedia from '../../Hooks/useMedia';
import { customMedia } from '../../styles';
import { FcNews, FcCalendar, FcTodoList, FcGrid, FcBookmark } from "react-icons/fc";
import { Link } from 'react-router-dom';
import routes from '../../routes';
import HeaderSideBtn from './HeaderSideBtn';

const Container = styled.div`
  width: 100%;
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
  `}
`

const PageBtn = styled.div`
  justify-self: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 2.75em;
    font-size: 2.75rem;
    cursor: pointer;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  padding: 5px 20px;
  background: ${props => props.theme.bgColor};
  border-radius: 5px;
  transition: background 1s ease;
`

const Header = ({ seeSideMenu, setSeeSideMenu }) => {
  return (<Container>
    <div></div>
    <PageBtn>
      <Link to={routes.home}><FcNews /></Link>
      <Link to={routes.todo}><FcTodoList /></Link>
      <Link to={routes.calendar}><FcCalendar /></Link>
      <Link to={routes.pageLink}><FcBookmark /></Link>
      <Link to={routes.menu}><FcGrid /></Link>
    </PageBtn>
    <HeaderSideBtn seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} />
  </Container>);
}

export default Header;