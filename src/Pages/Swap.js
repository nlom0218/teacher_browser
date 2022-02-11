import React, { useState } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import styled from 'styled-components';
import { customMedia } from '../styles';
import { inputLine } from '../Animations/InputLine';
import { useForm } from 'react-hook-form';
import { BtnFadeIn } from '../Animations/Fade';
import IcNameTableClick from '../icons/NameTable/IcNameTableClick';
import IcNameTable from '../icons/NameTable/IcNameTable';
import { inPopup, isPopupVar } from '../apollo';
import { useQuery, useReactiveVar } from '@apollo/client';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../Graphql/StudentList/query';
import { useParams } from 'react-router-dom';
import StudentList from '../Components/Swap/Popup/StudentList';

const Container = styled.div`
  display : grid;
  grid-template-rows : auto auto 1fr;
  padding: 40px;
  padding: 2.5rem;
  row-gap : 20px;
  row-gap : 1.25rem;
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
  column-gap: 60px;
  column-gap: 3.75rem;
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
  width : 100%;
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
const ListName = styled.div`
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

const Swap = () => {
  const { id } = useParams()
  const isPopup = useReactiveVar(isPopupVar);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(undefined);
  const [studentListName, setStudentListName] = useState(null);
  const [IconsLIstisHover, setIconListIsHover] = useState(false);

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id
    },
    skip: !id
  });

  const { register, handleSubmit, getValues } = useForm({
    mode : "onChange",
    defaultValues : { title : "자리바꾸기 제목" },
  });
   
  const onClickInput = () => {
    setIsEdit(true)
  }

  const onSubmit = (data) => {
    const { title } = data
    setTitle(title)
    setIsEdit(false)
  }

  const onBlurForm = () => {
    const title = getValues("title")
    onSubmit({ title })
  }

  const onClickListIcon = () => inPopup("seeStudentList")

  return (<BasicContainer menuItem={true}>
    <Container>
      <TopContents>
        <Title onBlur={onBlurForm} onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <Input
                {...register("title", {
                  required: true,
                  onChange: () => setIsEdit(true)
                })}
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
        <ListIcon>
          <ListName>{studentListName ? studentListName : "선택된 명렬표가 없습니다."}</ListName>
          <div onClick={onClickListIcon} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
              {IconsLIstisHover ? <IcNameTableClick /> : <IcNameTable />}
            </div>
        </ListIcon>
      </TopContents>
    </Container>
    {isPopup === "seeStudentList" && <StudentList />}
  </BasicContainer>);
}

export default Swap;