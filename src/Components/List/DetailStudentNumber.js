import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import useMedia from '../../Hooks/useMedia';
import { customMedia } from '../../styles';
import { EDIT_STUDENT_MUTATION, SEE_ONE_STUDENT } from "./DetailStudent"
import InputUnderLine from './InputUnderLine';
import { DetailStudentLayout, DetailTitle } from "./styled/DetailStudent"

const DetailNumberForm = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 5fr 2fr;
  `}
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`

const Submit = styled.input`
  cursor: pointer;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  text-align: center;
  grid-column: 2 / -1;
  border-radius: 5px;
  border-radius: 0.625rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  animation: ${BtnFadeIn} 1s ease;
  ${customMedia.greaterThan("tablet")`
    padding: 0;
  `}
`

const DetailStudentNumber = ({ studentInfo }) => {
  const [isEdit, setIsEdit] = useState(false)

  const media = useMedia()

  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      setIsEdit(false)
    }
  }

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ONE_STUDENT, variables: { studentId: studentInfo?._id } }]
  })

  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange"
  })

  const onClickInput = () => {
    setIsEdit(true)
  }

  const onSubmit = (data) => {
    const { studentNum } = data
    if (loading) {
      return
    }
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId: studentInfo?._id,
        studentOrder: parseInt(studentNum)
      }
    })
  }

  const onBlurForm = () => {
    setIsEdit(false)
    const studentNum = getValues("studentNum")
    onSubmit({ studentNum })
  }

  useEffect(() => {
    if (studentInfo?.studentOrder) {
      setValue("studentNum", studentInfo?.studentOrder)
    } else if (studentInfo?.studentOrder === null) {
      setValue("studentNum", "")
    }
  }, [studentInfo])
  return (<DetailStudentLayout>
    <DetailTitle>번호</DetailTitle>
    <DetailNumberForm onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
      <InputUnderLine isEdit={isEdit}>
        <Input
          {...register("studentNum", {
            onChange: () => {
              if (!isEdit) {
                setIsEdit(true)
              }
            }
          })}
          autoComplete="off"
          placeholder="학생 번호를 입력하세요."
          type="number"
          onClick={onClickInput}
          isEdit={isEdit}
          min={1}
          max={999999999}
        // int범위로 인해... 줄어듬...
        />
      </InputUnderLine>
      {isEdit ? <Submit
        value="수정"
        type="submit"
      /> : (media !== "Mobile" && <div></div>)}
    </DetailNumberForm>
  </DetailStudentLayout>);
}

export default DetailStudentNumber;