import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { EDIT_SCHEDULE_MUTATION } from '../../../Graphql/Schedule/mutation';
import { SEE_SCHEDULE_QUERY } from '../../../Graphql/Schedule/query';
import Loading from '../../Shared/Loading';
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

  const onCompleted = (result) => {
    const { editSchedule: { ok, error } } = result
    if (ok) {
      outPopup()
      setCreate(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const [editSchedule, { loading: editLoading }] = useMutation(EDIT_SCHEDULE_MUTATION, {
    onCompleted
  })

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
    if (startDate > endDate) {
      setErrMsg("시작일과 종료일을 다시 확인해주세요. 🥲")
      return
    }
    editSchedule({
      variables: {
        scheduleId: id,
        userEmail,
        schedule,
        startDate,
        endDate,
        color,
        ...(contents && { contents })
      }
    })
  }
  useEffect(() => {
    if (data) {
      setValue("schedule", data?.seeSchedule[0].schedule)
      setValue("contents", data?.seeSchedule[0].contents)
      setStartDate(new Date(parseInt(data?.seeSchedule[0].startDate)))
      setEndDate(new Date(parseInt(data?.seeSchedule[0].endDate)))
      setColor(data?.seeSchedule[0].color)
    }
  }, [data])

  if (loading) {
    return <Loading page="popupPage" />
  }

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