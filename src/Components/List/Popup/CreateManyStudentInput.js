import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrMsg from './ErrMsg';
import GenderBtnContainer from './GenderBtnContainer';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const NameInput = styled.input`
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

const CreateManyStudentInput = ({ index, existStudentArray, register, setStudentString, studentString }) => {
  // 이름의 중복 에러 메시지 state값
  const [errMsg, setErrMsg] = useState(undefined)

  // 학생 성별 state값
  const [gender, setGender] = useState(undefined)

  // gender값이 바뀔 때 마다 back-end로 전달되는 studentString값을 바꿈
  useEffect(() => {
    if (gender) {
      let newStudentString = [...studentString]
      newStudentString[index] = { name: undefined, gender }
      setStudentString(newStudentString)
    }
  }, [gender])

  return (<Layout>
    <NameInput
      {...register(`name${index}`, {
        required: true,
        onChange: () => setErrMsg(undefined),

        // 기존 생성된 학생들의 이름과 중복되면 errMsg생성
        validate: (name) => {
          const isExistName = existStudentArray.includes(name)
          if (isExistName) {
            setErrMsg(`${name}의 이름이 이미 존재합니다.`)
            return false
          } else {
            return true
          }
        }
      })}
      autoComplete="off"
      placeholder={`${index + 1}번째 학생 이름을 입력해주세요.`}
    />
    <GenderBtnContainer
      gender={gender}
      setGender={setGender}
      setErrMsg={setErrMsg}
    />
    {errMsg && <ErrMsg errMsg={errMsg} />}
  </Layout>);
}

export default CreateManyStudentInput;