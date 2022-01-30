import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';

const MoveContainer = styled.div`
  display: ${props => props.isSeeDisplay};
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${props => props.pageLinkSection === "pageLink" ? "-100%" : 0};
  left: ${props => props.pageLinkSection === "pageLink" ? "100%" : 0};
  animation: ${props => !props.init && (props.pageLinkSection === "pageLink" ? hideNewsSection : seeNewsSection)} 1s ease forwards;
`
const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`
const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    position: relative;
    min-height: 100%;
    max-height: 100%;
  `}
`

const LinkPickSection = ({userEmail, pageLinkSection, init, setInit }) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(pageLinkSection === "pageLink" ? "none" : "block")
  const onClickMoveIcon = () => {
    setInit(false)
    movePageLink()

  }
  return (<MoveContainer pageLinkSection={pageLinkSection} init={init} isSeeDisplay={isSeeDisplay}>
    <MoveIcon onClick={onClickMoveIcon}><FaArrowCircleLeft /></MoveIcon>
    <Container>
  <div>LINK PICK</div>
    </Container>
  </MoveContainer>)
}

export default LinkPickSection;