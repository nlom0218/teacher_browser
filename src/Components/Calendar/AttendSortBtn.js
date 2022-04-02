import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: -20px;
  bottom: -1.25rem;
  right: 0;
`

const AttendSortBtn = ({ attendOption, setAttendOption, selectedAttendOption, setSelectedAttedOption }) => {
  console.log(attendOption);
  const { register } = useForm({
    mode: "onChange"
  })

  const onInpuAttendSort = (event) => {
    console.log(event.currentTarget);
  }

  return (<Container>
    <form>
      <select
        {...register("attendType")}
      >
        <option>전체보기</option>
        {attendOption.filter(item => item.subject === "attendType").map((item, index) => {
          return <option key={index}>{item.option}</option>
        })}
      </select>
      <select
        {...register("studentName")}
      >
        <option>전체보기</option>
        {attendOption.filter(item => item.subject === "studentName").map((item, index) => {
          return <option key={index}>{item.option}</option>
        })}
      </select>
    </form>
  </Container>)
  // return (<SAttendSortBtn value={selectedAttendOption.option} onInput={onInpuAttendSort}>
  //   <option>전체보기</option>
  //   {attendOption.map((item, index) => {
  //     return <option key={index} value={item}>{item.option}</option>
  //   })}
  //   <
  // </SAttendSortBtn>);
}

export default AttendSortBtn;