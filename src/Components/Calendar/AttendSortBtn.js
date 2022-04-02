import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: -20px;
  bottom: -1.25rem;
  right: 0;
`

const AttendSortBtn = ({ attendOption, selectedAttendOption, setSelectedAttendOption }) => {

  const { register, getValues } = useForm({
    mode: "onChange"
  })

  const onChange = (data) => {
    const attendType = getValues("attendType")
    const studentName = getValues("studentName")
    const newSelected = { attend: attendType, studentName }
    setSelectedAttendOption(newSelected)
  }

  return (<Container>
    <form>
      <select
        {...register("attendType", {
          onChange: onChange
        })}
        value={selectedAttendOption.attend}
      >
        <option value="전체보기">전체보기</option>
        {attendOption.filter(item => item.subject === "attendType").map((item, index) => {
          return <option key={index} value={item.option}>{item.option}</option>
        })}
      </select>
      <select
        {...register("studentName", {
          onChange: onChange
        })}
        value={selectedAttendOption.studentName}
      >
        <option value="전체보기">전체보기</option>
        {attendOption.filter(item => item.subject === "studentName").map((item, index) => {
          return <option key={index} value={item.option}>{item.option}</option>
        })}
      </select>
    </form>
  </Container>)
}

export default AttendSortBtn;