import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import { outPopup } from '../../../apollo';
import { useMutation, useQuery } from '@apollo/client';
import { Icon, CalenderPopupTextareaLayout, CalenderPopupTitle, InputLayout, DateContainer } from './PopupLayout';
import { BsCalendarDate, BsFillPersonCheckFill, BsFillPersonFill } from 'react-icons/bs';
import { customMedia } from '../../../styles';
import { ko } from "date-fns/esm/locale";
import DatePicker from 'react-datepicker';
import { DELETE_ATTENDANCE_MUTATION, EDIT_ATTENDANCE_MUTATION } from '../../../Graphql/Attendance/mutation';
import { SEE_ATTENDANCE_QUERY } from "../../../Graphql/Attendance/query"
import Loading from '../../Shared/Loading';
import { format } from 'date-fns';

const CalenderPopupFormContainer = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto auto auto 1fr auto auto auto;
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

const EditAttend = ({ userEmail, setErrMsg, setMsg, setRefetchQuery }) => {

  const attendId = localStorage.getItem("summaryAttendId")
  const attendName = localStorage.getItem("summaryAttendName")

  const [type, setType] = useState(undefined)
  const [date, setDate] = useState(undefined);
  const [studentId, setStudentId] = useState(undefined)
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })

  const { data, loading } = useQuery(SEE_ATTENDANCE_QUERY, {
    variables: {
      attendId
    }
  })

  const onCompleted = (result) => {
    const { editAttendance: { ok, error } } = result
    if (ok) {
      setMsg("????????? ?????? ???????????????. ????")
      outPopup()
      localStorage.removeItem("attendStudentName")
      localStorage.removeItem("attendStudentId")
      localStorage.removeItem("summaryAttendId")
      localStorage.removeItem("summaryAttendName")
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }

  const deleteOnCompleted = (result) => {
    const { deleteAttendance: { ok, error } } = result
    if (ok) {
      setMsg("????????? ?????? ???????????????. ????")
      outPopup()
      localStorage.removeItem("attendStudentName")
      localStorage.removeItem("attendStudentId")
      localStorage.removeItem("summaryAttendId")
      localStorage.removeItem("summaryAttendName")
      setRefetchQuery(prev => prev + 1)
    } else {
      setErrMsg(error)
    }
  }



  const [editAttendance, { loading: editLoading }] = useMutation(EDIT_ATTENDANCE_MUTATION, {
    onCompleted,
  })

  const [deleteAttendance, { loading: deleteLoading }] = useMutation(DELETE_ATTENDANCE_MUTATION, {
    onCompleted: deleteOnCompleted
  })

  const onSubmit = (data) => {
    const { contents } = data
    if (!studentId) {
      setErrMsg("????????? ??????????????????. ????")
      return
    }
    if (!type) {
      setErrMsg("?????? ????????? ??????????????????. ????")
      return
    }
    if (!date) {
      setErrMsg("????????? ??????????????????. ????")
      return
    }

    const month = parseInt(format(new window.Date(date), "yyMM"))

    editAttendance({
      variables: {
        attendId,
        userEmail,
        type,
        month,
        date: new window.Date(date).setHours(0, 0, 0, 0),
        ...(contents && { contents })
      }
    })
  }

  const onClickDelBtn = () => {
    deleteAttendance({
      variables: {
        userEmail,
        attendId
      }
    })
  }

  useEffect(() => {
    if (data) {
      setStudentId(data?.seeAttendance[0]?.studentId)
      setType(data?.seeAttendance[0]?.type)
      setValue("contents", data?.seeAttendance[0]?.contents)
      setDate(new window.Date(data?.seeAttendance[0]?.date))
    }
  }, [data])


  if (loading || editLoading || deleteLoading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer maxHeight={true} needAlert={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CalenderPopupTitle>????????????</CalenderPopupTitle>
      <InputLayout>
        <Icon><BsFillPersonFill /></Icon>
        <SelectedStudent>
          <StudentName>{attendName}</StudentName>
        </SelectedStudent>
      </InputLayout>
      <InputLayout>
        <Icon><BsFillPersonCheckFill /></Icon>
        <AttendType>
          <Type onClick={() => setType("?????? ??????")} selected={type === "?????? ??????"}>?????? ??????</Type>
          <Type onClick={() => setType("?????? ??????")} selected={type === "?????? ??????"}>?????? ??????</Type>
          <Type onClick={() => setType("????????? ??????")} selected={type === "????????? ??????"}>????????? ??????</Type>
          <Type onClick={() => setType("?????? ??????")} selected={type === "?????? ??????"}>?????? ??????</Type>
          <Type onClick={() => setType("??????")} selected={type === "??????"}>??????</Type>
          <Type onClick={() => setType("??????")} selected={type === "??????"}>??????</Type>
          <Type onClick={() => setType("??????")} selected={type === "??????"}>??????</Type>
        </AttendType>
      </InputLayout>
      <CalenderPopupTextareaLayout register={register} />
      <InputLayout>
        <Icon><BsCalendarDate /></Icon>
        <DateContainer>
          <Date>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={date}
              todayButton="??????"
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
        value="????????????"
      />
      <DelBtn onClick={onClickDelBtn}>????????????</DelBtn>
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default EditAttend;