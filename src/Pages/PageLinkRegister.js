import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import FolderItem from '../Components/PageLinkRegister/FolderItem';
import TypeItem from '../Components/PageLinkRegister/TypeItem';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  position: absolute;
  top: 3%;
  bottom: 3%;
  right: 3%;
  left: 3%;
  background-color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  overflow: ${props => props.notScroll ? "scroll" : "scroll"};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`

const BasicLayout = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const PageTitle = styled.div`
  justify-self: flex-end;
  font-size: 2em;
  font-size: 2rem;
`

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  textarea {
    all: unset;
    resize: none;
    padding: 20px 40px;
    padding: 1.25rem 2.5rem;
    box-sizing: border-box;
    border-radius: 20px;
    border-radius: 1.25rem;
    border: 1px solid ${props => props.theme.fontColor};
    background-color: ${props => props.theme.contentBgColor};
    line-height: 160%;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
    }
  }
`

const InputLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  input {
    background-color: ${props => props.theme.contentBgColor};
    padding: 20px 40px;
    padding: 1.25rem 2.5rem;
    border-radius: 20px;
    border-radius: 1.25rem;
    border: 1px solid ${props => props.theme.fontColor};
    ::placeholder {
      color: ${props => props.theme.fontColor};
      opacity: 0.6;
    }
  }
`

const InputTitle = styled.div`
  padding: 0px 20px;
  padding: 0rem 1.25rem;
  font-size: 1.25em;
  font-size: 1.25rem;
`

const Folder = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  border: 1px solid ${props => props.theme.fontColor};
  background-color: ${props => props.theme.contentBgColor};
`

const SubmitInput = styled.input`
  padding: 20px;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  cursor: pointer;
  font-size: 1.25em;
  font-size: 1.25rem;
`

const PageLinkRegister = () => {
  const folder = [
    "교육청", "연수원", "학급경영", "국어", "영어", "수학", "사회", "과학", "음악", "미술", "체육", "실과", "제2외국어", "창체"
  ]
  const pageType = ["블로그", "유튜브"]
  const [submitFolder, setSubmitFolder] = useState([])
  console.log(submitFolder);
  const [submitType, setSubmitType] = useState(undefined)
  return (<Container>
    <BasicLayout>
      <PageTitle>추천 페이지 등록</PageTitle>
      <FormContainer>
        <InputLayout>
          <InputTitle>추천 페이지 이름(중복 불가능): 필수</InputTitle>
          <input
            placeholder="추천 페이지 이름을 적으세요."
          />
        </InputLayout>
        <InputLayout>
          <InputTitle>추천 페이지 URL: 필수</InputTitle>
          <input
            placeholder="추천 페이지의 주소를 적으세요. ex) https://www.teacher-can.com (https:// => 필수!!!)"
          />
        </InputLayout>
        <InputLayout>
          <InputTitle>추천 페이지 설명: 필수</InputTitle>
          <TextareaAutosize
            minRows="8"
            maxRows="8"
            placeholder="추천 페이지 설명을 적으세요. 줄바꿈이 적용됩니다."
          ></TextareaAutosize>
        </InputLayout>
        <InputLayout>
          <InputTitle>폴더 선택(중복 가능): 필수</InputTitle>
          <Folder>
            {folder.map((item, index) => {
              return <FolderItem key={index} item={item} setSubmitFolder={setSubmitFolder} submitFolder={submitFolder} />
            })}
          </Folder>
        </InputLayout>
        <InputLayout>
          <InputTitle>추천 페이지 종류(중복 불가능): 생략 가능</InputTitle>
          <Folder>
            {pageType.map((item, index) => {
              return <TypeItem key={index} item={item} />
            })}
          </Folder>
        </InputLayout>
        <SubmitInput
          type="submit"
          value="등록하기"
        />
      </FormContainer>
    </BasicLayout>
  </Container>);
}

export default PageLinkRegister;