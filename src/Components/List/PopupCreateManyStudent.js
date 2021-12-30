import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const NumForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 40px;
  column-gap: 2.5rem;
  .student_num_input {
    padding: 12px 20px;
    padding: 0.75rem 1.25rem;
    background-color: ${props => props.theme.contentBgColor};
    border-radius: 5px;
    border-radius: 0.625rem;
    ::placeholder {
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
  }
  .student_submit_input {
    padding: 12px 20px;
    padding: 0.75rem 1.25rem;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`

const PopupCreateManyStudent = () => {
  const [studentString, setStudentString] = useState([])
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const num = parseInt(data.num)
    console.log(num);
  }
  return (<Container>
    {studentString.length === 0 ?
      <NumForm onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("num", {
            required: true
          })}
          className="student_num_input"
          type="number"
          autoComplete="off"
          placeholder="학생 수를 입력하세요."
          min="2"
        />
        <input
          className="student_submit_input"
          type="submit"
          value="다음"
        />
      </NumForm>
      :
      <div>복수생성폼</div>
    }
  </Container>);
}

export default PopupCreateManyStudent;