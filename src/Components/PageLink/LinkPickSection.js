import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { FaArrowCircleLeft,FaRegBookmark,FaBookmark } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';
import Tabs from 'react-bootstrap/Tabs';
import {Tab, Row, Col, Nav, Button, Collapse,DropdownButton,Dropdown} from 'react-bootstrap';
import { BsBookmarkPlusFill, BsBookmarkPlus,BsStar, BsStarFill } from 'react-icons/bs';
import { BiPlay,BiChevronDown } from 'react-icons/bi';
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
  column-gap: 10px;
  column-gap: 0.625rem;
  background-color: ${props => props.theme.cardBg};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;

  .button{
    cursor: pointer;
  }
}
.ContentsPick{
  display: grid;
  grid-template-columns: 1fr 2fr 8fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  .button{
    cursor: pointer;
  }
  svg{
    font-size: 1.25rem;
    font-size: 1.25em;
    justify-self:left;
  }
}`

const FolderBtn=styled.select`

  color:#000000;
  font-size: 1rem;
  font-size: 1em;
  align-items: center; 
  cursor: pointer;



`


const basicLinkEdu = [ 
  {id : 0,
  name : "인디스쿨",
  info : "초등교사 커뮤니티",
  link : "www.indischool.co.kr",
  expanded : false,
  folder : "학습자료",
  memo : "",
  bookMark : false},
  {id : 1,
    name : "아이스크림",
    info : "아이스크림 자료",
    link : "www.indischool.co.kr",
    expanded : false,
    folder : "",
    memo : "",
    bookMark : false},
    {id : 2,
      name : "티셀파",
      info : "지학사",
      link : "www.indischool.co.kr",
      expanded : false,
      folder : "",
      memo : "",
      bookMark : false},
      {id : 3,
        name : "비바샘",
        info : "천재교육",
        link : "www.indischool.co.kr",
        expanded : false,
        folder : "",
        memo : "",
        bookMark : false}
]

//북마크 누르는데 빨리 빨리 반응을 안 한다.....






const LinkPickSection = ({userEmail, pageLinkSection, init, setInit,pageLinkFolderName }) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(pageLinkSection === "pageLink" ? "none" : "block")
  const [pick, setPick] = useState(false);
  const [folderPick, setFolderPick] = useState([]);
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
    console.log(item)
  }
  const onClickLinkPush = () =>{}

  const onClickBookMark= () =>{
    setPick(!pick)
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
<div>* {folderPick[0]} 추천사이트 보기</div> 

{basicLinkEdu.map((fold,i)=>{
        return(<>

        <div className='ContentsOne'onClick={()=>{
          const fold = [...basicLinkEdu];
          fold[i].expanded = !fold[i].expanded;
          setViewContents(fold)
        }}>
          <div><BiPlay/></div>
          <div>{fold.name}</div>
          <div>{fold.info}</div>
          <div className='button' onClick={()=> window.open(fold.link)}><IoArrowRedo/></div></div>
          {fold.expanded &&
          <div className='ContentsPick' onClick={()=>onClickViewContents(fold)}>
          <div></div>
          <FolderBtn>
          <div className='dropbtn' onClick={()=>{
          }}>fold.folder?fold.folder:"폴더선택"}
          {/* <BiChevronDown/> */}
          </div></FolderBtn>
          <input placeholder='메모작성'></input>
          <div className="button"
            onClick={()=>{
              const fold = [...basicLinkEdu];
              fold[i].bookMark = !fold[i].bookMark;
              setViewContents(fold)
            }}>
            {fold.bookMark
            ? <BsBookmarkPlusFill color='yellow'/>
            : <BsBookmarkPlus />
            }
           </div>
          </div>
         
          }
          </>
        )})}
</ContentsList>

</LinkPage>
    </Container>
  </MoveContainer>)
}

export default LinkPickSection;