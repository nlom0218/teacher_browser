import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { SEE_TO_DO_LIST_QUERY } from '../../../Graphql/ToDoList/query';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import PopupForm from '../styled/PopupForm';
import PopupInput from '../styled/PopupInput';
import PopupTitle from '../styled/PopupTitle';
import { PopupDate, PopupInputLayout, PopupStar, PopupTextarea } from './PopupLayout';

const Type = styled.div`
  color: ${props => props.not ? props.theme.redColor : props.theme.btnBgColor};
  font-weight: 600;
`

const SubmitBtn = styled.input`
  cursor : pointer;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  padding : 10px;
  padding : 0.625rem;
  text-align : center;
  border-radius : 5px;
  border-radius : 0.3125rem;
`;

const BottomBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  .bottom_btn {
    cursor : pointer;
    padding: 10px;
    padding: 0.625rem;
    text-align : center;
    border-radius : 5px;
    border-radius : 0.3125rem;
  }
`

const DelBtn = styled.div`
  background-color : ${props => props.theme.redColor};
  color : ${props => props.theme.bgColor};
`

const CompleteBtn = styled.div`
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
`

const DetailToDo = () => {
  const id = localStorage.getItem("detailToDo")

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [star, setStar] = useState(null)

  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange"
  })

  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      isComplete: false,
      id
    }
  })
  console.log(data);

  useEffect(() => {
    if (data) {
      setValue("toDo", data?.seeToDoList[0]?.toDo)
      setValue("contents", data?.seeToDoList[0]?.contents)
      setStartDate(parseInt(data?.seeToDoList[0]?.startDate))
      setEndDate(parseInt(data?.seeToDoList[0]?.endDate))
      setStar(data?.seeToDoList[0]?.star)
    }
  }, [data])

  if (loading) {
    return (<Loading page="popupPage" />)
  }

  return (<PopupContainer maxHeight={true}>
    <PopupForm create={false}>
      <PopupTitle>할 일 세부정보 및 수정하기</PopupTitle>
      <Type not={data?.seeToDoList[0]?.notToDo}>
        {data?.seeToDoList[0]?.notToDo && "미완료된 할 일"}
        {data?.seeToDoList[0]?.inComingToDo && "다가오는 할 일"}
        {data?.seeToDoList[0]?.ingToDo && "진행중인 할 일"}
      </Type>
      <PopupInputLayout>
        <PopupInput
          {...register("toDo", {
            required: true
          })}
          placeholder="내용을 입력하세요"
          autoComplete="off"
        />
      </PopupInputLayout>
      <PopupTextarea>
        <TextareaAutosize
          {...register('contents')}
          placeholder="세부내용을 입력하세요"
          minRows={3}
        >
        </TextareaAutosize>
      </PopupTextarea>
      <PopupDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <PopupStar star={star} setStar={setStar} />
      <SubmitBtn
        type="submit"
        value="수정하기"
      />
      <BottomBtn>
        <CompleteBtn className="bottom_btn">완료하기</CompleteBtn>
        <DelBtn className="bottom_btn">삭제하기</DelBtn>
      </BottomBtn>
    </PopupForm>
  </PopupContainer>);
}

export default DetailToDo;