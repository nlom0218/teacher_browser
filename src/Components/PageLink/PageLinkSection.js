import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';
import { moveLinkPick } from '../../apollo';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { customMedia } from "../../styles";
import { useForm } from "react-hook-form";
import { inputLine } from "../../Animations/InputLine";
import { BtnFadeIn } from "../../Animations/Fade";
import { FaArrowCircleRight } from 'react-icons/fa';
import { AiOutlineEdit } from "react-icons/ai";
import {BiPlusCircle,BiMinusCircle} from 'react-icons/bi';
import {BsFillCaretDownSquareFill,BsFillCaretUpSquareFill} from 'react-icons/bs';
import FolderList from "./FolderList";

//부트스트랩으로 했던 부분 그리드로 변경 
//현재 아코디언 부분이 하나를 누르면 닫아지지 않고 다른 걸 눌러야 보임. 
//정보목록 불러오는 거 수정해야 
//수정버튼이랑 삭제버튼 기능 구현 필요 
//사이트 이름 누르면 바로가기 링크 
//폴더추가 만들기 

const btnAni = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 1;
}
`

const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${props => props.pageLinkSection === "pageLink" ? 0 : "100%"};
  left: ${props => props.pageLinkSection === "pageLink" ? 0 : "-100%"};
  animation: ${props => !props.init && (props.pageLinkSection === "pageLink" ? seeWelcomSection : hideWelcomeSection)} 1s ease forwards;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`
const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`
const Container = styled.div`
  min-height: "100%";
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 20px;
  padding: 1.25rem;
    ${customMedia.greaterThan("desktop")`
   padding:0`}
`;
const TopContents = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  padding: 40px;
  padding: 2.5rem;
  align-items:flex-end;
  column-gap: 40px;
  column-gap: 2.5rem;
`;

const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  font-size: 1.5rem;
  font-size: 1.5em;
  align-self: bottom;
`;

const FolderPage=styled.div`
  display:grid;
  grid-template-columns: 1fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-self: flex-start;
  
`
const LinkFolder = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  padding: 8px;
  padding: 0.5rem;
 
  `
 const AccordionHeader= styled.div`
  display:grid;
  grid-template-columns: 1fr auto;
  font-size: 1.0625rem;
  font-size: 1.0625em;
  border: 1px solid;
  border-radius: 10px;
  border-radius: 0.625rem;
  padding: 12px;
  padding: 0.75rem;
  background-color: ${props => props.theme.cardBg};
  transition: background-color 1s ease, color 1s ease;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .newfolder{
    grid-template-columns: 7fr 1fr 1fr;
  }
`
 const AccordionBody= styled.div`
  display:grid;
  grid-template-columns: 1fr;
  animation: ${btnAni} 1.5s ease;


 `
const LinkContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 0.5fr 0.5fr;
  padding: 1px;
  padding: 0.0625rem;
  border: 1px solid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  column-gap: 1px;
  column-gap: 0.0625rem;
  text-align: center;
  font-size: 0.8rem;
  font-size: 0.8em;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
`
const ContentsOne = styled.div`
display: grid;
border: 1px solid;
padding: 10px;
padding: 0.625rem;
border-radius: 3px;
border-radius: 0.1875rem;
background-color: white;
align-items: center;
color: black;
`
const OptionBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;


const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-right: 0.3125rem;
  border-right: 5px;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`
const ButtonContent = styled.div`
  display: grid;
  grid-row: 2/3;
  grid-template-columns: 5fr 1fr;
  justify-items: right;
  align-items: center;  
  cursor : pointer;
  color : ${props => props.theme.btnBgColor};
  transition : color 1s ease;
  svg {
      display : flex;
      font-size : 2rem;
      font-size : 2em;
  }
  font{
    font-size: 0.7rem;
    font-size: 0.7em;
    
  }
`;



//백엔드 연결하면 리스트 내용 삭제하기 


const PageLinkSection = ({ pageLinkSection, init, setInit, pageLinkFolderName}) => {
    const [folder, setFolder] = useState(pageLinkFolderName.map((item,index)=>
    {
      return{
        title:item[0],
        description:item[1],
        expanded:false}
    }))

    const [addFolder, setAddFolder] = useState(false);

    const onClickMoveIcon = () => {
        setInit(false)
        moveLinkPick()
      }
    const onClickCreateBtn = () => {
  }

    
     
    const onClickAddFolder = ()=>{
      setAddFolder(!addFolder)
      console.log(folder[0].title)
    }
    
  return (<MoveContainer pageLinkSection={pageLinkSection} init={init}>
    <MoveIcon onClick={onClickMoveIcon}>
      <FaArrowCircleRight /> </MoveIcon>
<FolderList right={true}/>

    {/* <Container>
    <TopContents>
    <Title> 즐겨찾기 </Title>
    <ButtonContent onClick={onClickAddFolder}>폴더수정
    <AiOutlineEdit onClick={onClickCreateBtn}/>
    </ButtonContent>
    </TopContents>
   
    <FolderPage>

      {addFolder &&
      <AccordionHeader>
      <input placeholder="새로운 폴더명 입력"></input>
      <BiPlusCircle color="green"/>
      <BiMinusCircle color="red" onClick={onClickAddFolder}/>
      </AccordionHeader>} 
      
      {folder.map((fold, i) => {
        return (
          <div key={fold.title}>
            <AccordionHeader
              onClick={() => {
                const fold = [...folder];
                fold[i].expanded = !fold[i].expanded;
                setFolder(fold);
              }}
            >
              <div>
                <b>{fold.title}</b>
              </div>
              <div>
                {fold.expanded ? <BsFillCaretUpSquareFill/> 
                : <BsFillCaretDownSquareFill/>}
              </div>
              </AccordionHeader>
            {fold.expanded && 
              <AccordionBody>
                <LinkFolder>
                <LinkContents>
                <ContentsOne >{fold.title}</ContentsOne>
                <ContentsOne>{fold.description}</ContentsOne>
                <OptionBtn>수정</OptionBtn> 
                <DelBtn>삭제</DelBtn></LinkContents></LinkFolder>
              </AccordionBody>}
          </div>
        );
      })}
    
    </FolderPage>
    </Container> */}
  </MoveContainer>);

  }

export default PageLinkSection;