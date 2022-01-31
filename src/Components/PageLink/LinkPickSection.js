import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';
import Tabs from 'react-bootstrap/Tabs';
import {Tab, Row, Col, Nav, Button} from 'react-bootstrap';


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
const LinkPage = styled.div`
  display: grid;
  padding: 40px;
  padding: 2.5rem;
  row-gap: 10px;
  row-gap: 0.625rem;
`
const Font = styled.div`
font-size: 1rem;
font-size: 1em;
text-align: center;
display: grid;
cursor: pointer;
`
const Outline = styled.div`
border: 1px solid;
border-radius: 5px;
border-radius: 0.3125rem;
background-color: #E6E6E6;
height: 100%;


`

const LinkPickSection = ({userEmail, pageLinkSection, init, setInit }) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(pageLinkSection === "pageLink" ? "none" : "block")
  const onClickMoveIcon = () => {
    setInit(false)
    movePageLink()
  }
  const onClickTab1 = () =>{}
  useEffect(() => {
    if (pageLinkSection === "linkPick") {
      setIsSeeDisplay("block")
    }
  }, [pageLinkSection])


  return (<MoveContainer pageLinkSection={pageLinkSection} init={init} isSeeDisplay={isSeeDisplay}>
    <MoveIcon onClick={onClickMoveIcon}><FaArrowCircleLeft /></MoveIcon>
    <Container>
      <LinkPage>
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3} >
    <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Outline><Nav.Link eventKey="first" onClick={onClickTab1}><div class="w-100 p-1"><Font>추천 사이트 전체 보기</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        <Nav.Item>
          <Outline><Nav.Link eventKey="second" onClick={onClickTab1}><div class="w-100 p-1"><Font>원격연수원</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        <Nav.Item>
          <Outline><Nav.Link eventKey="thrid" onClick={onClickTab1}><div class="w-100 p-1"><Font>학급운영</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        <Nav.Item>
          <Outline><Nav.Link eventKey="fourth" onClick={onClickTab1}><div class="w-100 p-1"><Font>국어</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        <Nav.Item>
          <Outline><Nav.Link eventKey="fifth" onClick={onClickTab1}><div class="w-100 p-1"><Font>수학</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        <Nav.Item>
          <Outline><Nav.Link eventKey="sixth" onClick={onClickTab1}><div class="w-100 p-1"><Font>사회</Font></div></Nav.Link></Outline><br/>
        </Nav.Item>
        
      </Nav>
      <br/><br/><div className="d-grid gap-2"><Button variant="warning" > 사이트 추천하기</Button></div>
    </Col> 
    <Col sm={9}> <Outline>
  
      <Tab.Content>
        <Tab.Pane eventKey="first">
          <div>1에 해당하는 내용</div>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
         <div>2에 해당하는 내용</div>
        </Tab.Pane>
        <Tab.Pane eventKey="thrid">
          <div>3 해당하는 내용</div>
        </Tab.Pane>
        <Tab.Pane eventKey="fourth">
         <div>4 해당하는 내용</div>
        </Tab.Pane>
        <Tab.Pane eventKey="fifth">
          <div>5 해당하는 내용</div>
        </Tab.Pane>
        <Tab.Pane eventKey="sixth">
         <div>6 해당하는 내용</div>
        </Tab.Pane>
     
      </Tab.Content></Outline>
    </Col>
  </Row>
</Tab.Container>
</LinkPage>
    </Container>
  </MoveContainer>)
}

export default LinkPickSection;