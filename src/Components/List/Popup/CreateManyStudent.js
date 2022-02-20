import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { customMedia } from '../../../styles';
import CreateManyStudentFrom from './CreateManyStudentFrom';

const Container = styled.div`
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const NumForm = styled.form`
  display: grid;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  .student_num_input {
    padding: 12px 20px;
    padding: 0.75rem 1.25rem;
    background-color: ${props => props.theme.contentBgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    ::placeholder {
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
  }
  .student_submit_input {
    text-align: center;
    padding: 12px 20px;
    padding: 0.75rem 1.25rem;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`

const CreateManyStudent = ({ existStudentArray, createStudent, loading, email, setErrorMsg }) => {
  // back-end로 전달되는 학생들의 이름, 성별 정보가 담겨진 배열 => back-end로는 문자열로 변환하여 전달
  const [studentString, setStudentString] = useState([])

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })

  // 생성할 학생의 수 만큼 studentString값을 바꿈
  const onSubmit = (data) => {
    const num = parseInt(data.num)
    const newStudentString = []
    for (let i = 0; i < num; i++) {
      const student = { name: undefined, gender: undefined }
      newStudentString.push(student)
    }
    setStudentString(newStudentString)
  }
  return (<Container>
    {studentString.length === 0 ?
      <NumForm onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("num", {
            required: true,
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
      <CreateManyStudentFrom
        existStudentArray={existStudentArray}
        studentString={studentString}
        setStudentString={setStudentString}
        createStudent={createStudent}
        setErrorMsg={setErrorMsg}
        loading={loading}
        email={email}
      />
    }
  </Container>);
}

export default CreateManyStudent;