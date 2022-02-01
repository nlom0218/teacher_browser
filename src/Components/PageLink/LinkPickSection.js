import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { FaArrowCircleLeft,FaRegBookmark,FaBookmark } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';
import Tabs from 'react-bootstrap/Tabs';
import {Tab, Row, Col, Nav, Button, Collapse,DropdownButton,Dropdown} from 'react-bootstrap';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { BiPlay } from 'react-icons/bi';
import {IoArrowRedo} from 'react-icons/io5';

//드롭박스 폴더 선택 추가해야 함
//폴더 누를 때 색 변화 등 추가 
//페이지 추천에 구글 폼 연결
//북마크 누르면 디비에 저장할 수 있고, 북마크 색도 계속 변화되게 북마크 누르면 저장. 
//여기도 아코디언이 동시에 열리는게 안 됨. 안해도 될 것 같긴 함. 
// 바로가기 버튼에 링크 연결 



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
  height: 100%;
  ${customMedia.greaterThan("desktop")`
    position: relative;
    min-height: 100%;
    max-height: 100%;
  `}
`
const LinkPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 40px;
  padding: 2.5rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  height: 100%;
`
const FolderList = styled.div`

height: 100%;
grid-template-columns: 1fr;
padding: 10px;
padding: 0.625rem;
row-gap: 16px;
row-gap: 1rem;
background-color: ${props => props.theme.contentBgColor};
transition : background-color 1s ease;
border-radius : 10px;
border-radius : 0.625rem;
align-self: flex-start;
cursor: pointer;

.Folder{
  border : 1px solid;
  border-color: gray;
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  overflow: hidden;
  text-align: center;
  background-color: ${props => props.theme.cardBg};
  transition: background-color 1s ease, color 1s ease;

}
.LinkPush{
  border : 1px solid;
  border-color: gray;
  color:#2E2E2E;
  padding: 8px;
  padding: 0.5rem;
  overflow: hidden;
  text-align: center;
  background-color: #BCF5A9;
  transition: background-color 1s ease;
}
`

const ContentsList = styled.div`

align-self: flex-start;
display: grid;
border : 1px solid;
grid-template-columns: 1fr;
padding: 5px;
padding: 0.3125rem;
row-gap: 16px;
row-gap: 1rem;
align-items: flex-start;

.ContentsOne{
  padding: 5px;
  padding: 0.3125rem;
  display: grid;
  border : 1px solid;
  grid-template-columns: 1fr 3fr 8fr 1fr;
}
.ContentsPick{
  display: grid;
  grid-template-columns: 1fr 3fr 8fr 1fr;
}


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
  const [pick, setPick] = useState();
  const [folderPick, setFolderPick] = useState();
  const [viewContents, setViewContents] = useState();



  const onClickMoveIcon = () => {
    setInit(false)
    movePageLink()
  }
  const onClickPickFolder = (item) =>{
    setFolderPick(item);
  }
  const onClickViewContents = (item)=>{
    setViewContents(item);
  }
  const onClickLinkPush = () =>{}

  const onClickBookMark= (item) =>{
    setPick(item)
  }
  useEffect(() => {
    if (pageLinkSection === "linkPick") {
      setIsSeeDisplay("block")
    }
  }, [pageLinkSection])


  return (
  <MoveContainer pageLinkSection={pageLinkSection} init={init} isSeeDisplay={isSeeDisplay}>
    <MoveIcon onClick={onClickMoveIcon}><FaArrowCircleLeft /></MoveIcon>
    <Container>
      <LinkPage>
     <FolderList>
     {pageLinkFolderName.map((item,index)=>{
        return(<><div className='Folder' folderPick={folderPick} item={item}
        onClick={()=>onClickPickFolder(item)}>{item[0]}</div><br/></>)})}
        <div className='LinkPush' onClick={onClickLinkPush}>페이지 추천</div>
     </FolderList>
<ContentsList>
{pageLinkFolderName.map((item,index)=>{
        return(<>
        <div className='ContentsOne'onClick={()=>onClickViewContents(item)}>
          <div><BiPlay/></div>
          <div>{item[0]}</div>
          <div>설명글</div>
          <div><IoArrowRedo/></div></div>
          {viewContents===item
          ? <div className='ContentsPick' onClick={()=>onClickViewContents(item)}>
          <div></div>
          <div>폴더 선택</div>
          {/* <DropdownButton variant='outline-primary' title="폴더 선택">
  {pageLinkFolderName.map((item,index)=>{
        return(
  <Dropdown.Item as="button" key={index}> {item[0]}</Dropdown.Item>)})}
</DropdownButton> */}


          <input placeholder='메모작성'></input>
          <div onClick={()=>onClickBookMark(item)}>
            {pick===item
            ? <FaBookmark color='yellow'/>
            : <FaRegBookmark />
            }
           </div>
          </div>
          :null
          }
          </>
        )})}
</ContentsList>

</LinkPage>
    </Container>
  </MoveContainer>)
}

export default LinkPickSection;