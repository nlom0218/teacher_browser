import React, { useState } from "react";
import styled from 'styled-components';
import { FaArrowCircleRight } from 'react-icons/fa';
import { moveLinkPick } from '../../apollo';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { customMedia } from "../../styles";
import { useForm } from "react-hook-form";
import { inputLine } from "../../Animations/InputLine";
import { BtnFadeIn } from "../../Animations/Fade";
import Accordion from 'react-bootstrap/Accordion'
import { MdAddCircle } from 'react-icons/md';
import {BsFillCaretDownSquareFill,BsFillCaretUpSquareFill} from 'react-icons/bs';

//부트스트랩으로 했던 부분 그리드로 변경 
//현재 아코디언 부분이 하나를 누르면 닫아지지 않고 다른 걸 눌러야 보임. 
//정보목록 불러오는 거 수정해야 
//수정버튼이랑 삭제버튼 기능 구현 필요 
//사이트 이름 누르면 바로가기 링크 
//폴더추가 만들기 



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

const AccordionN = styled.div`
  display:grid;
  grid-template-columns: 1fr;
 `

 const AccordionItem= styled.div`
  display:grid;
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
  


`
 const AccordionBody= styled.div`
  display:grid;
  grid-template-columns: 1fr;

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
      font-size : 2.5rem;
      font-size : 2.5em;
  }
  font{
    font-size: 0.7rem;
    font-size: 0.7em;
    
  }
`;
// 
//백엔드 연결하면 리스트 내용 삭제하기 
// const pageLinkFolderName = [["교육청",["경기도교육청","메모"],["사이트이름/","메모"]],["미술",["사이트이름/","메모"]],["영어",["사이트이름/","메모"]],["과학",["사이트이름/","메모"]],["연수원",["사이트이름/","메모"]]]
const PageLinkSection = ({ pageLinkSection, init, setInit, pageLinkFolderName}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(undefined);
    const [folderOpen, setFolderOpen] = useState();

    const { register, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: { title: "즐겨찾기" },
      });

    const onClickMoveIcon = () => {
        setInit(false)
        moveLinkPick()
      }
    
    const onClickInput = () => {setIsEdit(true);};
    const onClickCreateBtn = () => {
  }



    const onClickFolder = (item) => {
      if (item===folderOpen){
        setFolderOpen();
      }
      setFolderOpen(item);
     }


    const onSubmit = (data) => {
        const { title } = data;
        setTitle(title);
        setIsEdit(false);
      };
    
    const onBlurForm = () => {
        const title = getValues("title");
        onSubmit({ title });
      };

  return (<MoveContainer pageLinkSection={pageLinkSection} init={init}>
    <MoveIcon onClick={onClickMoveIcon}>
      <FaArrowCircleRight />
    </MoveIcon>
    <Container>
    <TopContents>
    <Title> 즐겨찾기 
    </Title>
    <ButtonContent>폴더추가
                <MdAddCircle onClick={onClickCreateBtn}/>
            </ButtonContent>
    </TopContents>
   
    <FolderPage>
      
{pageLinkFolderName.map((item,index)=>
 
        <AccordionN>
  <AccordionItem>
    <AccordionHeader key={index} item={item} onClick={() => onClickFolder(item)}>{item[0]}
    {folderOpen===item
    ? <BsFillCaretUpSquareFill/>
    : <BsFillCaretDownSquareFill/>}
   </AccordionHeader>
   { folderOpen===item
   ?     <AccordionBody>
   {item.map((i,index)=><LinkFolder key={{index}}>
       <LinkContents><ContentsOne >{i[0]}</ContentsOne>
       <ContentsOne>
     {i[1]}
       </ContentsOne>
       <OptionBtn>수정</OptionBtn> <DelBtn>삭제</DelBtn></LinkContents></LinkFolder>)}
   </AccordionBody>
    : null
   }

  </AccordionItem>
</AccordionN>

)}
    </FolderPage>
    </Container>
  </MoveContainer>);

  }

export default PageLinkSection;