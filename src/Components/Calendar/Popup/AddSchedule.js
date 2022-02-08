import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md"
import { ImQuestion } from "react-icons/im"
import { BsCheckLg, BsFillPencilFill } from "react-icons/bs"
import { CgNotes } from "react-icons/cg"
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineBgColors } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import { useMutation } from '@apollo/client';
import { CREATE_SCHEDULE_MUTATION } from '../../../Graphql/Schedule/mutation';

const Container = styled.div`
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto 1fr;
  min-height: 100%;
  max-height: 100%;
`

const Title = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
`

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto 1fr auto auto auto;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${props => props.theme.originBgColor};
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
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Icon = styled.div`
  padding: ${props => props.notPaddingTop ? "0px" : "15px"} 0px;
  padding: ${props => props.notPaddingTop ? "0px" : "0.9375rem"} 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`

const Input = styled.input`
  background-color: ${props => props.theme.originBgColor};
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
  }
`

const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 30px 30px 30px;
  grid-template-rows: 1.875rem 1.875rem 1.875rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  column-gap: 5px;
  column-gap: 0.3125rem;
  .delete_color {
    background-color: ${props => props.theme.blurColor};
  }
  ${customMedia.greaterThan("tablet")`
      grid-template-columns: repeat(9, 1fr);
      grid-template-rows: 30px 30px;
      grid-template-rows: 1.875rem 1.875rem;
  `}
`

const ColorItem = styled.div`
  background-color: ${props => props.color};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const DateContainer = styled.div`
  display: grid;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  .start_date,
  .end_date {
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    background-color: ${props => props.theme.originBgColor};
    text-align: center;
    border-radius: 20px;
    border-radius: 1.25rem;
  }
  ${customMedia.greaterThan("tablet")`
     grid-template-columns : 1fr auto 1fr;
  `}
`

const CheckBox = styled.div`
  svg {
    display: flex;
  }
`

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

const AddSchedule = ({ userEmail, setErrMsg }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);
  const [color, setColor] = useState(undefined)
  const bgColorArr = [
    "rgba(244, 67, 53, 0.5)", "rgba(233, 29, 98, 0.5)", "rgba(156, 39, 176, 0.5)", "rgba(103, 58, 182, 0.5)", "rgba(63, 80, 181, 0.5)", "rgba(53, 150, 243, 0.5)",
    "rgba(58, 168, 244, 0.5)", "rgba(63, 188, 212, 0.5)", "rgba(47, 150, 136, 0.5)", "rgba(76, 175, 79, 0.5)", "rgba(139, 194, 74, 0.5)", "rgba(205, 220, 56, 0.5)",
    "rgba(252, 235, 58, 0.5)", "rgba(249, 192, 11, 0.5)", "rgb(247, 152, 2, 0.5)", "rgba(245, 87, 34, 0.5)", "rgba(121, 85, 71, 0.5)", "rgba(96, 125, 138, 0.5)"
  ]
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { createSchedule: { ok } } = result
    if (ok) {
      outPopup()
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
    <Container>
      <Title>일정등록</Title>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputLayout>
          <Icon><BsFillPencilFill /></Icon>
          <Input
            {...register("schedule", { required: true })}
            type="text"
            placeholder="제목을 입력하세요."
            autoComplete="off"
          />
        </InputLayout>
        <InputLayout>
          <Icon><CgNotes /></Icon>
          <TextareaAutosize
            {...register("contents")}
            minRows={5}
            placeholder="세부내용을 입력하세요."
          />
        </InputLayout>
        <InputLayout>
          <Icon><BsCalendarDate /></Icon>
          <DateContainer>
            <div className="start_date">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={startDate}
                todayButton="오늘"
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale={ko}
              />
            </div>
            <div>~</div>
            <div className="end_date">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                locale={ko}
                placeholderText="종료일 설정"
              />
            </div>
          </DateContainer>
        </InputLayout>
        <InputLayout>
          <Icon notPaddingTop={true}><AiOutlineBgColors /></Icon>
          <ColorContainer>
            {bgColorArr.map((item, index) => {
              return <ColorItem key={index} color={item} onClick={() => setColor(item)}>
                {color === item && <CheckBox><BsCheckLg /></CheckBox>}
              </ColorItem>
            })}
          </ColorContainer>
        </InputLayout>
        <SubmitInput
          type="submit"
          value="등록하기"
        />
      </FormContainer>
    </Container>
  </PopupContainer>);
}

export default AddSchedule;