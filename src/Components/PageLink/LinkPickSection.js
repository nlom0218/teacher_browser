import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { FaArrowCircleLeft,FaRegBookmark,FaBookmark } from 'react-icons/fa';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';
import PageLinkSection from './PageLinkSection';
import { movePageLink } from '../../apollo';
import { BsBookmarkPlusFill, BsBookmarkPlus,BsStar, BsStarFill } from 'react-icons/bs';
import { BiPlay,BiChevronDown } from 'react-icons/bi';
import {IoArrowRedo} from 'react-icons/io5';
import FolderList from './FolderList';
import ContentsItem from './ContentsItem';
import { useMutation } from '@apollo/client';


//드롭박스 폴더 선택 추가해야 함
//폴더 누를 때 색 변화 등 추가 
//페이지 추천에 구글 폼 연결
//북마크 누르면 디비에 저장할 수 있고, 북마크 색도 계속 변화되게 북마크 누르면 저장. 
//여기도 아코디언이 동시에 열리는게 안 됨. 안해도 될 것 같긴 함. 
// 바로가기 버튼에 링크 연결 



const MoveContainer = styled.div`
  display: ${props => props.isSeeDisplay};
  position: absolute;
  padding: 20px;
  padding: 1.25rem;
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



const ContentsList = styled.div`
  position: absolute;
  top: 4%;
  right: 4%;
  width: 65%;
  max-height: 92%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar{
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(4,1fr) ;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;

`
 

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
  link : "https://www.indischool.com",
  expanded : false,
  folder : "학습자료",
  memo : "",
  bookMark : false},
  {id : 1,
    name : "아이스크림",
    info : "아이스크림 자료",
    link : "https://www.i-scream.co.kr",
    expanded : false,
    folder : "",
    memo : "",
    bookMark : false},
    {id : 2,
      name : "티셀파",
      info : "지학사",
      link : "https://tsherpa.co.kr",
      expanded : false,
      folder : "",
      memo : "",
      bookMark : false},
      {id : 3,
        name : "비바샘",
        info : "천재교육",
        link : "https://www.vivasam.com",
        expanded : false,
        folder : "",
        memo : "",
        bookMark : false}
]

//북마크 누르는데 빨리 빨리 반응을 안 한다.....






const LinkPickSection = ({userEmail, pageLinkSection, init, setInit,pageLinkFolderName, link}) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(pageLinkSection === "pageLink" ? "none" : "block")
  const [pick, setPick] = useState(false);
  const [folderPick, setFolderPick] = useState([]);
  const [viewContents, setViewContents] = useState();
  const [userLinkTitleArr, setUserLinkTitleArr] = useState([])

  const onClickMoveIcon = () => {
    setInit(false)
    movePageLink()
  }

  const onClickViewContents = (item)=>{
    setViewContents(item);
    console.log(item)
  }


  const onClickBookMark= () =>{
    setPick(!pick)
  }
  useEffect(() => {
    if (pageLinkSection === "linkPick") {
      setIsSeeDisplay("block")
    }
  }, [pageLinkSection])
  useEffect (()=>{
    if (link){
      setUserLinkTitleArr(link.map((item)=>item.siteName))
    }
  })


  return (
  <MoveContainer pageLinkSection={pageLinkSection} init={init} isSeeDisplay={isSeeDisplay}>
    <MoveIcon onClick={onClickMoveIcon}><FaArrowCircleLeft /></MoveIcon>
  <FolderList/>
  <ContentsList>

{basicLinkEdu.map((item,i)=>{
        return( 
          <ContentsItem userLinkTitleArr={userLinkTitleArr} key={i} item={item} link={link} userEmail={userEmail}/>
)})}
        </ContentsList>
        </MoveContainer>)}
      

export default LinkPickSection;