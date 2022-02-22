import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { outPopup } from '../../../apollo';
import { useMutation, useQuery } from '@apollo/client';
import { Icon, CalenderPopupTextareaLayout, CalenderPopupTitle, InputLayout, DateContainer } from './PopupLayout';
import { BsCalendarDate, BsFillPersonFill } from 'react-icons/bs';
import { ko } from "date-fns/esm/locale";
import DatePicker from 'react-datepicker';
import { DELETE_JOURNAL_MUTATION, EDIT_JOURNAL_MUTATION } from '../../../Graphql/Journal/mutation';
import { SEE_JOURNAL_QUERY } from '../../../Graphql/Journal/query';
import Loading from '../../Shared/Loading';

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

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const EditJournal = ({ userEmail, setErrMsg, setMsg, setRefetchQuery, urlDate }) => {

  const journalId = localStorage.getItem("JournalId")
  const journalStudentName = localStorage.getItem("JournalStudentName")

  const [date, setDate] = useState(undefined);
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })

  const { data, loading } = useQuery(SEE_JOURNAL_QUERY, {
    variables: {
      teacherEmail: userEmail,
      journalId
    }
  })

  const onCompleted = (result) => {
    const { editJournal: { ok, error } } = result
    if (ok) {
      setMsg("학급일지가 수정되었습니다. 😀")
      outPopup()
      localStorage.removeItem("summaryJournalId")
      localStorage.removeItem("summaryJournalName")
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const deleteOnCompleted = (result) => {
    const { deleteJournal: { ok, error } } = result
    if (ok) {
      setMsg("학급일지가 삭제되었습니다. 😀")
      outPopup()
      localStorage.removeItem("summaryJournalId")
      localStorage.removeItem("summaryJournalName")
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const [editJournal, { loading: editLoading }] = useMutation(EDIT_JOURNAL_MUTATION, {
    onCompleted
  });

  const [deleteJournal, { loading: deleteLoading }] = useMutation(DELETE_JOURNAL_MUTATION, {
    onCompleted: deleteOnCompleted
  });

  const onSubmit = (data) => {
    const { contents } = data
    if (!contents) {
      setErrMsg("세부사항을 적어주세요. 🥲")
      return
    }
    if (!date) {
      setErrMsg("날짜를 선택해주세요. 🥲")
      return
    }

    editJournal({
      variables: {
        userEmail,
        journalId,
        date: new window.Date(date).setHours(0, 0, 0, 0),
        text: contents
      }
    })
  }

  const onClickDelBtn = () => {
    deleteJournal({
      variables: {
        userEmail,
        journalId
      }
    })
  }

  useEffect(() => {
    if (urlDate) {
      setDate(new window.Date(parseInt(urlDate)))
    }
  }, [])

  useEffect(() => {
    if (data) {
      setValue("contents", data?.seeJournal[0]?.text)
      if (!urlDate) {
        setDate(new window.Date(data?.seeJournal[0]?.date))
      }
    }
  }, [data])

  if (loading || editLoading || deleteLoading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CalenderPopupTitle>학급일지 수정</CalenderPopupTitle>
      <InputLayout>
        <Icon><BsFillPersonFill /></Icon>
        <SelectedStudent>
          <StudentName>{journalStudentName}</StudentName>
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
        value="수정하기"
      />
      <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default EditJournal;