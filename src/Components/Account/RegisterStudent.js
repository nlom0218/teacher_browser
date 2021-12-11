import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcDataRecovery } from 'react-icons/fc';
import styled from 'styled-components';
import RegisterContainer from './RegisterContainer';
import RegisterErrMsg from './styled/RegisterErrMsg';
import RegisterForm from './styled/RegisterForm';

const Input = styled.input`
  /* background-color: red; */
`

const RegisterStudent = ({ setRegisterPage }) => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const studentNum = parseInt(data.studentNum);
    if (studentNum <= 0) {
      setErrMsg("0 또는 음수는 입력할 수 없습니다.")
    }
  }
  const onChangeInput = () => setErrMsg(undefined)
  return (<RegisterContainer setRegisterPage={setRegisterPage}>
    <RegisterForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("studentNum", {
          required: true,
          onChange: onChangeInput
        })}
        type="number"
        placeholder="학생 수를 입력해주세요."
        autoComplete="off"
      />
      <FcDataRecovery onClick={handleSubmit(onSubmit)} />
    </RegisterForm>
    {errMsg && <RegisterErrMsg>{errMsg}</RegisterErrMsg>}
  </RegisterContainer>);
}

export default RegisterStudent;