import React, { useState } from "react";
import styled from 'styled-components';
import { FaArrowCircleRight } from 'react-icons/fa';
import { moveLinkPick } from '../../apollo';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { customMedia } from "../../styles";
import { useForm } from "react-hook-form";
import { inputLine } from "../../Animations/InputLine";
import { BtnFadeIn } from "../../Animations/Fade";
import Button from 'react-bootstrap/Button'


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
  grid-template-columns: 1fr;
  padding: 40px;
  padding: 2.5rem;
  align-items: flex-start;
`;

const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  h1 {
    font-size: 0.9rem;
    font-size: 0.9em;
    opacity: 0.7;
  }
`;
const Input = styled.input`
  width: 100%;
  font-size: 2em;
  font-size: 2rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`;
const InputLayout = styled.div``;

const LineBox = styled.div`
  position: relative;
`;
const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;
const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease;
`;
const FolderPage=styled.div`
  display:grid;
  grid-template-columns: 1fr 7fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  height: 100%;
`
const LinkFolder = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  padding: 20px;
  padding: 1.25rem;
  border: 1px solid;
  border-radius: 10px;
  border-radius: 0.625rem;
  text-align: center;
  align-items: center;
  font-size: 1.2rem;
  font-size: 1.2em;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  `
const LinkContents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 20px;
  padding: 1.25rem;
  border: 1px solid;
  border-radius: 10px;
  border-radius: 0.625rem;
  font-size: 1.2rem;
  font-size: 1.2em;
`


const pageLinkFolderName = [["교육청",["사이트이름/","메모/편집버튼"],["사이트이름/","메모/편집버튼"]],["미술"],["영어"],["과학"],["연수원"],["학급경영"]]
const PageLinkSection = ({ pageLinkSection, init, setInit }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(undefined);

    const { register, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: { title: "즐겨찾기" },
      });

    const onClickMoveIcon = () => {
        setInit(false)
        moveLinkPick()
      }
    
    const onClickInput = () => {setIsEdit(true);};

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
    <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
    <InputLayout>
            <Input
            {...register("title",{
              required:true,
              onChange : () => setIsEdit(true),
            })}
            type="text"
            autoComplete="off"
            onClick={onClickInput} />
            {isEdit && (
                <LineBox>
                  <Line></Line>
                </LineBox>
              )}
            </InputLayout>
            {isEdit && <SubmitInput type="submit" value="저장" />}
    </Title>
    </TopContents>
    <FolderPage>
        {pageLinkFolderName.map((item,index)=>
        <><LinkFolder key={index}>{item[0]}</LinkFolder>
        <LinkContents>{item.map((i,index)=><div key={{index}}>{i}</div>)}</LinkContents></>)}
    </FolderPage>
    </Container>
  </MoveContainer>);

  }

export default PageLinkSection;