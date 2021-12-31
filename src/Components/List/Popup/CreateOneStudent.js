import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrMsg from './ErrMsg';
import GenderBtnContainer from "./GenderBtnContainer"


const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const NameInput = styled.input`
  grid-column: 1 / -1;
  padding: 12px 20px;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
  }
`

const SubmitInput = styled.input`
  justify-self: flex-end;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const CreateOneStudent = ({ createStudent, loading, email }) => {
  // 이름의 중복 에러 메시지 state값
  const [errMsg, setErrMsg] = useState(undefined)

  const [gender, setGender] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    if (!gender) {
      setErrMsg("성별을 선택하지 않았습니다.")
      return
    }
    if (loading) {
      return
    }
    const { name } = data
    createStudent({
      variables: {
        teacherEmail: email,
        studentString: JSON.stringify([{ name, gender }])
      }
    })
  }
  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <NameInput
      {...register("name", {
        required: true,
        onChange: () => setErrMsg(undefined)
      })}
      type="text"
      autoComplete="off"
      placeholder="학생 이름을 입력해주세요."
    />
    <GenderBtnContainer
      gender={gender}
      setGender={setGender}
      setErrMsg={setErrMsg}
    />
    <SubmitInput
      type="submit"
      value="생성"
    />
    {errMsg && <ErrMsg errMsg={errMsg} />}
  </Form>);
}

export default CreateOneStudent;