import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';
import Tabs from 'react-bootstrap/Tabs';
import {Tab, Row, Col, Nav, Button, Collapse,DropdownButton,Dropdown} from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';

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
width: 100%;
border: 1px solid;
border-radius: 5px;
border-radius: 0.3125rem;
background-color: #E6E6E6;
height: 100%;


`

const LinkPickSection = ({userEmail, pageLinkSection, init, setInit,pageLinkFolderName }) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(pageLinkSection === "pageLink" ? "none" : "block")
  const [open, setOpen] = useState(false);

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
      {pageLinkFolderName.map((item,index)=>{
        return(
         <Nav.Item>
         <Outline><Nav.Link eventKey={index} onClick={onClickTab1}><div class="w-100 p-1"><Font>{item[0]}</Font></div></Nav.Link></Outline><br/>
       </Nav.Item>)
      })}
     
        
      </Nav>
      <br/><br/><div className="d-grid gap-2"><Button variant="warning" > 사이트 추천하기</Button></div>
    </Col> 
    <Col sm={9}> <Outline>
    <br /> <br />
      <Tab.Content class="h5">
      {pageLinkFolderName.map((item,index)=>{
        return(     <Tab.Pane eventKey={index}>
          <div class="text-center">
          <div class="row">
          <div class="col-sm-1"></div>
  <div class="col-sm-1"> <span class="text-warning" onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      > {open===false ?<BsStar/> :<BsStarFill /> }
      </span></div>
  <div class="col-sm-4" >{item[0]}</div>
  <div class="col-sm-6">{item[1]}</div>
<hr/>
  <div class="col-sm-1"></div>

  <div class="col-sm-2">  
      <Collapse in={open}>
      <div id="example-collapse-text">
      <DropdownButton variant='outline-primary' title="폴더 선택">
  {pageLinkFolderName.map((item,index)=>{
        return(
  <Dropdown.Item as="button" key={index}> {item[0]}</Dropdown.Item>)})}
</DropdownButton>
        </div></Collapse></div>
       


        <div class="col-sm-3" >
        <Collapse in={open}>
      <div id="example-collapse-text">

          {item[0]}</div>
       </Collapse></div>

  <div class="col-sm-6">
      <Collapse in={open}>
      <div id="example-collapse-text"><input placeholder='메모 작성'></input></div></Collapse></div>
      </div>  </div>

      <br />

        </Tab.Pane>)})}

     
      </Tab.Content></Outline>
    </Col>
  </Row>
</Tab.Container>
</LinkPage>
    </Container>
  </MoveContainer>)
}

export default LinkPickSection;