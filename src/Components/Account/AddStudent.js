import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';
import { SEE_ALL_STUDENT_QUERY } from "./StudentInfo"

const ADD_STUDENT_MUTATION = gql`
  mutation DeleteStudent($teacherEmail: String!, $name: String!) {
    addStudent(teacherEmail: $teacherEmail, name: $name) {
      ok
      error
    }
  }
`

const Container = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  input {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
    column-gap: 40px;
    column-gap: 2.5rem;
  `}
  div {
    grid-column: 1 / -1;
  }
`

const Input = styled.input`
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
`

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  cursor: pointer;
`

const AddStudent = ({ userEmail }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { addStudent: { ok } } = result
    if (ok) {
      setValue("name", "")
    }
  }
  const [addStudent, { loading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }, { query: ME_QUERY }]
  })
  const onSubmit = (data) => {
    const { name: NewName } = data
    if (loading) {
      return
    }
    addStudent({
      variables: {
        teacherEmail: userEmail,
        name: NewName
      }
    })
  }
  return (<Container onSubmit={handleSubmit(onSubmit)}>
    <div>학생 추가하기</div>
    <Input
      {...register("name", {
        required: true
      })}
      placeholder="학생 이름을 입력해주세요."
      type="text"
      autoComplete="off"
    />
    <SubmitInput
      type="submit"
      value="추가하기"
    />
  </Container>);
}

export default AddStudent;