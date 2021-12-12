import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';

const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudent($teacherEmail: String!, $studentString: String!) {
    createStudent(teacherEmail: $teacherEmail, studentString: $studentString) {
      ok
      error
    }
  }
`

const SStudentList = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    column-gap: 2.5rem
  `}
`

const StudentItem = styled.div`
  display: grid;
  align-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 4fr;
  `}
`

const StudentNum = styled.div``

const StudentNameInput = styled.input`
  background-color: red;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
`

const RegisterInput = styled.input`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
`

const StudentList = ({ studentArr, userEmail, setRegisterPage }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onCompleted = () => {
    setRegisterPage(undefined)
  }
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const newStudentArr = []
    for (let i = 0; i < studentArr.length; i++) {
      newStudentArr.push(data[i + 1])
    }
    const studentString = newStudentArr.join(",")
    createStudent({
      variables: {
        teacherEmail: userEmail,
        studentString
      }
    })
  }
  useEffect(() => {
    for (let i = 0; i < studentArr.length; i++) {
      setValue(`${studentArr[i]}`, `${studentArr[i]}번 학생`)
    }
  }, [studentArr])
  return (<SStudentList onSubmit={handleSubmit(onSubmit)}>
    {studentArr.map((item, index) => {
      return <StudentItem key={index}>
        <StudentNum>{item}번</StudentNum>
        <StudentNameInput
          {...register(`${item}`, {
            required: true
          })}
          autoComplete="off"
          placeholder={`${item}번 학생 이름을 등록해주세요.`}
        />
      </StudentItem>
    })}
    <RegisterInput type="submit" value="등록하기" />
  </SStudentList>);
}

export default StudentList;