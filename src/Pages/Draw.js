import BasicContainer from '../Components/Shared/BasicContainer';
import React, { useEffect } from "react";
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../apollo';
import { useQuery, useReactiveVar } from '@apollo/client';
import StudentList from '../Components/Draw/Popup/StudentList';
import { FcContacts } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import useMedia from '../Hooks/useMedia';
import { customMedia } from '../styles';
import { useState } from 'react/cjs/react.development';
import { inputLine } from '../Animations/InputLine';
import { BtnFadeIn } from '../Animations/Fade';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../Graphql/StudentList/query';


const Container = styled.div`
  display : grid;
  padding : 40px;
  padding : 2.5rem;
  align-items : flex-start;
`


const TopContents = styled.div`
  display : grid;  
  grid-template-columns : 1fr;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : center;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns : 1fr auto;
  column-gap : 20px;
  column-gap : 1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
  grid-template-columns : 1fr;
  `}
`

const Title = styled.form`
  grid-row : 2 / 3;
  display : grid;
  grid-template-columns : 1fr auto;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
  ${customMedia.greaterThan("tablet")`
  grid-row: 1 / 2;
  `}
`

const Input = styled.input`
  font-size : 1.5em;
  font-size : 1.5rem;
  padding : 10px 0px;
  padding : 0.625rem 0rem;
`

const InputLayout = styled.div`
`

const LineBox = styled.div`
  position : relative;
`

const Line = styled.div`
  position : absolute;
  height : 2px;
  top : 0px;
  left : 50%;
  transform : translateX(-50%);
  background : ${props => props.theme.fontColor};
  opacity : 0.6;
  transition : background 1s ease, opacity 1s ease;
  animation : ${inputLine} 0.6s ease forwards;
`


const SubmitInput = styled.input`
  cursor : pointer;
  padding : 10px 30px ;
  padding : 0.625rem 1.875rem;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  border-radius : 5px;
  border-radius : 0.3125rem;
  animation : ${BtnFadeIn} 0.6s ease;
`


const ListIcon = styled.div`
  grid-row : 1 / 2;
  justify-self : flex-end;
  display : grid;
  grid-template-columns : auto auto;
  column-gap : 10px;
  column-gap : 0.625rem;
  align-items : center;
  svg {
    display : flex;
    font-size : 2.5em;
    font-size : 2.5rem;
    cursor : pointer;
  }
`

const ListName = styled.div`
`



const Draw = () => {
  const { id } = useParams()
  const media = useMedia()
  const isPopup = useReactiveVar(isPopupVar)
  const [studentListName, setStudentListName] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(undefined)
  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id
    },
    skip: !id
  })
  const onClickListIcon = () => inPopup("seeStudentList")
  const onClickInput = () => {
    setIsEdit(true)
  }
  const onBlurForm = () => {
    setIsEdit(false)
  }
  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0]?.listName)
    }
  }, [data])

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <TopContents>
          <Title onBlur={onBlurForm}>
            <InputLayout>
              <Input
                type="text"
                placeholder="제목을 입력하세요."
                autocomplete="off"
                onClick={onClickInput}
              />
              {isEdit && <LineBox>
                <Line></Line>
              </LineBox>}
            </InputLayout>
            {isEdit && <SubmitInput
              type="submit"
              value="저장"
            />}
          </Title>
          {media !== "Desktop" &&
            <ListIcon>
              <ListName>{studentListName ? studentListName : "선택된 명렬표가 없습니다."}</ListName>
              <FcContacts onClick={onClickListIcon} />
            </ListIcon>}
        </TopContents>
      </Container>
      {isPopup === "seeStudentList" && <StudentList />}
    </BasicContainer>
  );
};

export default Draw;

{/* <div style={style}>
      <input
        type="text"
        name="name"
        placeholder="이름입력"
        style={{width: "500px"}}
        onChange={onDataChange}
        value={name}
      />
      &nbsp;&nbsp;
      <button onClick={onCreate}>추가</button>
    </div> */}