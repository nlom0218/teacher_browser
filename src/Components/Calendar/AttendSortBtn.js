import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  /* position: absolute;
  bottom: -20px;
  bottom: -1.25rem;
  right: 0; */
  grid-column: 1 / -1;
  justify-self: flex-end;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
`

const Select = styled.select`
  padding: 5px 20px;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.green};
  transition: color 1s ease, background-color 1s ease;
  border: none;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
`

const AttendSortBtn = ({ attendOption, selectedAttendOption, setSelectedAttendOption }) => {

  const { register, getValues } = useForm({
    mode: "onChange"
  })

  const onChange = () => {
    const attendType = getValues("attendType")
    const studentName = getValues("studentName")
    const newSelected = { attend: attendType, studentName }
    setSelectedAttendOption(newSelected)
  }

  return (<Container>
    <Form>
      <Select
        {...register("attendType", {
          onChange: onChange
        })}
        value={selectedAttendOption.attend}
      >
        <option value="전체보기">전체보기(출결)</option>
        {attendOption.filter(item => item.subject === "attendType").map((item, index) => {
          return <option key={index} value={item.option}>{item.option}</option>
        })}
      </Select>
      <Select
        {...register("studentName", {
          onChange: onChange
        })}
        value={selectedAttendOption.studentName}
      >
        <option value="전체보기">전체보기(학생)</option>
        {attendOption.filter(item => item.subject === "studentName").map((item, index) => {
          return <option key={index} value={item.option}>{item.option}</option>
        })}
      </Select>
    </Form>
  </Container>)
}

export default AttendSortBtn;