import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import { useMutation } from '@apollo/client';
import { CREATE_SCHEDULE_MUTATION } from '../../../Graphql/Schedule/mutation';
import { CalenderPopupColorLayout, CalenderPopupContainer, CalenderPopupDateLayout, CalenderPopupFormContainer, CalenderPopupInputLayout, CalenderPopupTextareaLayout, CalenderPopupTitle } from './PopupLayout';

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  cursor: pointer;
  ${customMedia.greaterThan("tablet")`
     margin-bottom: 0;
  `}
`

const AddSchedule = ({ userEmail, setErrMsg, setCreate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);
  const [color, setColor] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { createSchedule: { ok } } = result
    if (ok) {
      outPopup()
      setCreate(prev => prev + 1)
    }
  }

  const [createSchedule, { loading }] = useMutation(CREATE_SCHEDULE_MUTATION, {
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
    createSchedule({
      variables: {
        userEmail,
        schedule,
        startDate,
        endDate,
        color,
        ...(contents && { contents })
      }
    })
  }

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupContainer>
      <CalenderPopupTitle>일정등록</CalenderPopupTitle>
      <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
        <CalenderPopupInputLayout register={register} />
        <CalenderPopupTextareaLayout register={register} />
        <CalenderPopupDateLayout startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <CalenderPopupColorLayout color={color} setColor={setColor} />
        <SubmitInput
          type="submit"
          value="등록하기"
        />
      </CalenderPopupFormContainer>
    </CalenderPopupContainer>
  </PopupContainer>);
}

export default AddSchedule;