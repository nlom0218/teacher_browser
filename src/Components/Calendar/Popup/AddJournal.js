import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { inPopup, outPopup } from '../../../apollo';
import { useMutation } from '@apollo/client';
import { Icon, CalenderPopupTextareaLayout, CalenderPopupTitle, InputLayout, DateContainer } from './PopupLayout';
import { BsCalendarDate, BsFillPersonFill } from 'react-icons/bs';
import { customMedia } from '../../../styles';
import { ko } from "date-fns/esm/locale";
import DatePicker from 'react-datepicker';
import IcNameTableClick from '../../../icons/NameTable/IcNameTableClick';
import { WRITE_JOURNAL_MUTATION } from '../../../Graphql/Journal/mutation';
import { SEE_JOURNAL_QUERY } from '../../../Graphql/Journal/query';

const CalenderPopupFormContainer = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto auto 1fr auto auto;
  min-height: 100%;
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

const SelectedStudent = styled.div`
  background-color: ${props => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0px 20px;
  padding: 0rem 1.25rem;
  align-items: center;
`

const StudentName = styled.div`
  opacity: ${props => props.selected ? 1 : 0.6};
`

const SelectBtn = styled.div`
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const AttendType = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  padding: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  background-color: ${props => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(4, 1fr);
  `}
`

const Type = styled.div`
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  background-color: ${props => props.selected && props.theme.btnBgColor};
  color: ${props => props.selected && props.theme.bgColor};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :hover {
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 0.6s ease, color 0.6s ease;
  }
`

const Date = styled.div`
  grid-column: 1 / -1;
  display : grid;
  align-items : center;
`

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

const AddJournal = ({ userEmail, setErrMsg, setMsg, setRefetchQuery, urlDate }) => {

  const journalStudentName = localStorage.getItem("JournalStudentName")
  const journalStudentId = localStorage.getItem("JournalStudentId")

  const [date, setDate] = useState(undefined);
  const [studentName, setStudentName] = useState(undefined)
  const [studentId, setStudentId] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { writeJournal: { ok, error } } = result
    if (ok) {
      setMsg("새로운 학급일지가 작성되었습니다. 😀")
      outPopup()
      localStorage.removeItem("attendStudentName")
      localStorage.removeItem("attendStudentId")
      localStorage.removeItem("seletedStudentType")
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const [writeJournal, { loading }] = useMutation(WRITE_JOURNAL_MUTATION, {
    onCompleted,
    refetchQueries: [{
      query: SEE_JOURNAL_QUERY,
      variables: {
        studentId,
        teacherEmail: userEmail
      }
    }]
  });

  const onSubmit = (data) => {
    const { contents } = data
    if (!contents) {
      setErrMsg("세부사항을 적어주세요. 🥲")
      return
    }
    if (!studentId) {
      setErrMsg("학생을 선택해주세요. 🥲")
      return
    }
    if (!date) {
      setErrMsg("날짜를 선택해주세요. 🥲")
      return
    }

    writeJournal({
      variables: {
        userEmail,
        ownerId: studentId,
        date: new window.Date(date).setHours(0, 0, 0, 0),
        text: contents
      }
    })
  }

  const onClickSelectBtn = () => {
    inPopup("selectedStudent")
    localStorage.setItem("seletedStudentType", "journal")
  }

  useEffect(() => {
    setStudentName(localStorage.getItem("attendStudentName"))
    setStudentId(localStorage.getItem("attendStudentId"))
  }, [])

  useEffect(() => {
    if (urlDate) {
      setDate(new window.Date(parseInt(urlDate)))
    } else {
      setDate(new window.Date())
    }
    if (journalStudentName) {
      setStudentName(journalStudentName)
      setStudentId(journalStudentId)
    }
  }, [])

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CalenderPopupTitle>학급일지 작성</CalenderPopupTitle>
      <InputLayout>
        <Icon><BsFillPersonFill /></Icon>
        <SelectedStudent>
          <StudentName selected={studentName}>{studentName ? studentName : "선택된 학생이 없습니다."}</StudentName>
          {!journalStudentName && <SelectBtn onClick={onClickSelectBtn}><IcNameTableClick /></SelectBtn>}
        </SelectedStudent>
      </InputLayout>
      <CalenderPopupTextareaLayout register={register} type="journal" />
      <InputLayout>
        <Icon><BsCalendarDate /></Icon>
        <DateContainer>
          <Date>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={date}
              todayButton="오늘"
              onChange={(date) => setDate(date)}
              selectsStart
              startDate={date}
              locale={ko}
            />
          </Date>
        </DateContainer>
      </InputLayout>
      <SubmitInput
        type="submit"
        value="작성하기"
      />
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default AddJournal;