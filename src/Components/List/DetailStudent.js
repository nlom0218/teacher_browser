import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { customMedia } from '../../styles';
import DetailStudentAllergy from './DetailStudentAllergy';
import DetailStudentOrder from './DetailStudentOrder';
import InputUnderLine from './InputUnderLine';
import { SEE_ALL_STUDENT_QUERY } from './StudentList';

const SEE_ONE_STUDENT = gql`
  query SeeAllStudent($studentId: ID) {
    seeAllStudent(studentId: $studentId) {
      _id
      teacherEmail
      studentName
      studentOrder
      studentGender
      parentPhoneNum
      allergy
      tag
    }
  }
`

export const EDIT_STUDENT_MUTATION = gql`
mutation Mutation(
  $teacherEmail: String!,
  $studentId: ID!,
  $studentName: String,
  $studentGender: String,
  $parentPhoneNum: String, 
  $allergy: [Int], 
  $tag: [String], 
  $delTag: String) {
  editStudent(
    teacherEmail: $teacherEmail, 
    studentId: $studentId, 
    studentName: $studentName, 
    studentGender: $studentGender, 
    parentPhoneNum: $parentPhoneNum, 
    allergy: $allergy, 
    tag: $tag, 
    delTag: $delTag) {
      ok
      error
  }
}
`

const Container = styled.div`
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  margin-top: 20px;
  margin-top: 1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
  margin-top: 0;
  `}
`

const Name = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  /* background-color: red; */
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
    font-size: 1.75em;
    font-size: 1.75rem;
  `}
`

const SubmitInput = styled.input`
  grid-column: 1 / -1;
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  animation: ${BtnFadeIn} 0.6s ease forwards;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
    grid-column: -2 / -1;
    margin-left: 30px;
    margin-left: 1.875rem;
  `}
`

const ErrMsg = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
`

const Part = styled.div``

const Title = styled.div``

const Contents = styled.div``

const DetailStudent = ({ studentId }) => {
  const [studentInfo, setStudentInfo] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)
  const { data, loading } = useQuery(SEE_ONE_STUDENT, {
    variables: {
      studentId
    }
  })
  const onCompleted = (result) => {
    const { editStudent: { ok, error } } = result
    if (error) {
      setErrMsg(error)
      return
    }
    if (ok) {
      setIsEdit(false)
    }
  }
  const [editStudent, { loading: editLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }]
  })
  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { newStudentName } = data
    if (newStudentName === studentInfo.studentName) {
      setIsEdit(false)
      return
    }
    if (editLoading) {
      return
    }
    editStudent({
      variables: {
        teacherEmail: studentInfo.teacherEmail,
        studentId,
        studentName: newStudentName
      }
    })
  }

  // form 영역 밖을 클릭 했을 때도 listName이 바뀌게 설정
  const onBlurForm = () => {
    const newStudentName = getValues("newStudentName")
    onSubmit({ newStudentName })
  }

  const onClickName = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    if (data) {
      setValue("newStudentName", data?.seeAllStudent[0]?.studentName)
      setStudentInfo(data?.seeAllStudent[0])
    }
  }, [data])
  return (<Container>
    <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
      <InputUnderLine isEdit={isEdit}>
        <Name
          {...register("newStudentName", {
            required: true,
            onChange: () => {
              setErrMsg(undefined)
              setIsEdit(true)
            }
          })}
          type="text"
          autoComplete="off"
          placeholder="학생 이름을 입력하세요."
          maxLength="12"
          onClick={onClickName}
        />
      </InputUnderLine>
      {isEdit && <SubmitInput type="submit" value="수정" />}
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    </Form>
    <DetailStudentAllergy studentInfo={studentInfo} editStudent={editStudent} onCompleted={onCompleted} />
    <DetailStudentOrder studentInfo={studentInfo} />
  </Container>);
}

export default DetailStudent;