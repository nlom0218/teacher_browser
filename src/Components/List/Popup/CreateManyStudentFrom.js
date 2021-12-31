import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import CreateManyStudentInput from './CreateManyStudentInput';
import ErrMsg from './ErrMsg';

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.875rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const SubmitInput = styled.input`
  text-align: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.6s ease;
`

const CreateManyStudentFrom = ({ existStudentArray, studentString, setStudentString, createStudent, email, loading }) => {
  // 성별 체크 에러메시지
  const [errMsg, setErrMsg] = useState(undefined)

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    // 성별이 모두 체크가 안 될 경우 에러메시지 만들기
    const isUndefinedGender = studentString.map(item => item.gender).includes(undefined)
    if (isUndefinedGender) {
      setErrMsg("성별 선택을 완료해 주세요.");
      return
    }

    if (loading) {
      return
    }

    // 객체의 value만 모아서 배열로 만들기
    const studentNameArr = Object.values(data)

    // input과 성별버튼에서 전발 받은 모든 데이터를 모아서 back-end로 보낼 studentString 생성
    const newStudentString = studentString.map((item, index) => {
      return { name: studentNameArr[index], gender: item.gender }
    })
    createStudent({
      variables: {
        teacherEmail: email,
        studentString: JSON.stringify(newStudentString)
      }
    })
  }
  return (<Form onSubmit={handleSubmit(onSubmit)}>
    {studentString.map((_, index) => {
      return <CreateManyStudentInput
        key={index}
        index={index}
        register={register}
        existStudentArray={existStudentArray}
        setStudentString={setStudentString}
        studentString={studentString}
      />
    })}
    <SubmitInput
      type="submit"
      value="생성"
      disabled={!isValid}
    />
    {errMsg && <ErrMsg errMsg={errMsg} />}
  </Form>);
}

export default CreateManyStudentFrom;