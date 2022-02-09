import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SEE_SCHEDULE_QUERY } from '../../../Graphql/Schedule/query';
import PopupContainer from '../../Shared/PopupContainer';
import { CalenderPopupColorLayout, CalenderPopupDateLayout, CalenderPopupFormContainer, CalenderPopupInputLayout, CalenderPopupTextareaLayout, CalenderPopupTitle } from './PopupLayout';

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const EditSchedule = ({ userEmail, setErrMsg, setCreate }) => {
  const id = localStorage.getItem("editSchedule")
  console.log(id);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);
  const [color, setColor] = useState(undefined)
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })

  const { data, loading } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      scheduleId: id
    }
  })

  console.log(data);

  // const onCompleted = (result) => {
  //   const { createSchedule: { ok } } = result
  //   if (ok) {
  //     outPopup()
  //     setCreate(prev => prev + 1)
  //   }
  // }

  // const [createSchedule, { loading }] = useMutation(CREATE_SCHEDULE_MUTATION, {
  //   onCompleted
  // })

  const onSubmit = (data) => {
    const { schedule, contents } = data
    if (!endDate) {
      setErrMsg("종료일을 설정해주세요. 🥲")
      return
    }
    if (!color) {
      setErrMsg("배경색을 설정해주세요. 🥲")
      return
    }
    // createSchedule({
    //   variables: {
    //     userEmail,
    //     schedule,
    //     startDate,
    //     endDate,
    //     color,
    //     ...(contents && { contents })
    //   }
    // })
  }
  useEffect(() => {
    if (data) {
      setValue("schedule", data?.seeSchedule[0].schedule)
    }
  }, [data])

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CalenderPopupTitle>일정수정</CalenderPopupTitle>
      <CalenderPopupInputLayout register={register} />
      <CalenderPopupTextareaLayout register={register} />
      <CalenderPopupDateLayout startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <CalenderPopupColorLayout color={color} setColor={setColor} />
      <SubmitInput
        type="submit"
        value="수정하기"
      />
      <DelBtn>
        삭제하기
        </DelBtn>
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default EditSchedule;