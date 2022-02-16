import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { outPopup } from '../../../apollo';
import { useMutation } from '@apollo/client';
import { CREATE_SCHEDULE_MUTATION } from '../../../Graphql/Schedule/mutation';
import { CalenderPopupColorLayout, CalenderPopupDateLayout, CalenderPopupFormContainer, CalenderPopupInputLayout, CalenderPopupTextareaLayout, CalenderPopupTitle } from './PopupLayout';

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const AddSchedule = ({ userEmail, setErrMsg, refetch, setMsg, setRefetchQuery }) => {

  const [startDate, setStartDate] = useState(new window.Date());
  const [endDate, setEndDate] = useState(undefined);
  const [color, setColor] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { createSchedule: { ok, error } } = result
    if (ok) {
      setMsg("새로운 일정이 추가되었습니다. 😀")
      outPopup()
      refetch()
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const [createSchedule, { loading }] = useMutation(CREATE_SCHEDULE_MUTATION, {
    onCompleted,
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
    if (new Date(startDate).setHours(0, 0, 0, 0) > endDate) {
      setErrMsg("시작일과 종료일을 다시 확인해주세요. 🥲")
      return
    }

    createSchedule({
      variables: {
        userEmail,
        schedule,
        startDate: new Date(startDate).setHours(0, 0, 0, 0),
        endDate: new Date(endDate).setHours(0, 0, 0, 0),
        color,
        ...(contents && { contents })
      }
    })
  }

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CalenderPopupTitle>일정등록</CalenderPopupTitle>
      <CalenderPopupInputLayout register={register} />
      <CalenderPopupTextareaLayout register={register} />
      <CalenderPopupDateLayout startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <CalenderPopupColorLayout color={color} setColor={setColor} />
      <SubmitInput
        type="submit"
        value="등록하기"
      />
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default AddSchedule;