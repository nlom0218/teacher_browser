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
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
  }
`

const RegisterStudent = ({ setRegisterPage, userEmail }) => {
  const [studentArr, setStudentArr] = useState([])
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const studentNum = parseInt(data.studentNum);
    const newStudentArr = []
    for (let i = 0; i < studentNum; i++) {
      newStudentArr.push(i + 1)
    }
    setStudentArr(newStudentArr)
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
    {studentArr.length !== 0 &&
      <StudentList
        studentArr={studentArr}
        userEmail={userEmail}
        setRegisterPage={setRegisterPage}
      />}
  </RegisterContainer>);
}

export default RegisterStudent;