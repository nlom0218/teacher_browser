import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcDataRecovery } from 'react-icons/fc';
import styled from 'styled-components';
import RegisterContainer from './RegisterContainer';
import StudentList from './StudentList';
import RegisterForm from './styled/RegisterForm';

const Input = styled.input`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
  -webkit-appearance: none;
  }
`

const Div = styled.div`
  padding: 50px;
`

const RegisterStudent = ({ setRegisterPage }) => {
  const [studentNum, setStudentNum] = useState(0)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const studentNum = parseInt(data.studentNum);
    setStudentNum(studentNum);
  }
  return (<RegisterContainer setRegisterPage={setRegisterPage}>
    <RegisterForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("studentNum", {
          required: true,
        })}
        type="number"
        placeholder="학생 수를 입력해주세요."
        autoComplete="off"
        autoFocus
        min="1"
      />
      <FcDataRecovery onClick={handleSubmit(onSubmit)} />
    </RegisterForm>
    {studentNum !== 0 && <StudentList />}
  </RegisterContainer>);
}

export default RegisterStudent;