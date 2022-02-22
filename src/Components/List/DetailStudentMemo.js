import React, { useEffect, useState } from 'react';
import { DetailStudentLayout, DetailTitle } from './styled/DetailStudent';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import { SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { useMutation } from '@apollo/client';
import { BtnFadeIn } from '../../Animations/Fade';
import { customMedia } from '../../styles';

const MemoContainer = styled.form`
  margin-top: 20px;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  .meno_textarea {
    all: unset;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${props => props.theme.contentBgColor};
    transition: border 1s ease, background-color 1s ease;
    line-height: 160%;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
    }
  }
`

const SubmitInput = styled.input`
  cursor: pointer;
  text-align: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease forwards;
  ${customMedia.greaterThan("desktop")`
    justify-self: flex-end;
  `}
`

const DetailStudentMemo = ({ studentMemo, studentId, teacherEmail, setSuccessMsg }) => {
  const [isEdit, setIsEdit] = useState(false)
  console.log(studentMemo);

  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      setSuccessMsg("학생메모가 수정되었습니다. 😀")
      setIsEdit(false)
    }
  }

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ONE_STUDENT_QUERY, variables: { studentId } },
    ]
  })

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { memo } = data
    editStudent({
      variables: {
        teacherEmail,
        studentId,
        memo
      }
    })
  }

  const onBlurForm = () => {
    const memo = getValues("memo")
    onSubmit({ memo })
  }

  const onChangeTextarea = () => setIsEdit(true)

  useEffect(() => {
    setValue("memo", studentMemo)
  }, [studentMemo])
  return (<DetailStudentLayout>
    <DetailTitle>학생메모</DetailTitle>
    <MemoContainer onSubmit={handleSubmit(onSubmit)} isEdit={isEdit} onBlur={onBlurForm}>
      <TextareaAutosize
        {...register("memo", {
          onChange: onChangeTextarea
        })}
        style={{ minWidth: "100%", maxWidth: "100%" }}
        maxRows="10"
        minRows="10"
        className="meno_textarea"
        placeholder="학생에 대한 간단한 메모를 남겨보세요!"
      />
      {isEdit && <SubmitInput type="submit" value="수정" />}
    </MemoContainer>
  </DetailStudentLayout>);
}

export default DetailStudentMemo;