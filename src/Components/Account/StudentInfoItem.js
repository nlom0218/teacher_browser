import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';
import { SEE_ALL_STUDENT_QUERY } from './StudentInfo';

const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudent($teacherEmail: String!, $name: String!) {
    deleteStudent(teacherEmail: $teacherEmail, name: $name) {
      ok
      error
    }
  }
`

const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  input {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto auto;
  `}
`

const Input = styled.input`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
  `}
`

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  transition: background-color 1s ease, color 1s ease;
  color: ${props => props.theme.bgColor};
  text-align: center;
  cursor: pointer;
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const StudentInfoItem = ({ name, userEmail }) => {
  const { register, setValue } = useForm({
    mode: "onChange",
  })
  const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT_MUTATION, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }, { query: ME_QUERY }]
  })
  const onClickDelBtn = () => {
    if (loading) {
      return
    }
    deleteStudent({
      variables: {
        teacherEmail: userEmail,
        name
      }
    })
  }
  useEffect(() => {
    setValue("name", name)
  }, [name])
  return (<Container>
    <Input
      {...register("name", {
        required: true
      })}
      type="text"
      autoComplete="off"
      placeholder="학생 이름을 입력해주세요."
    />
    <SubmitInput
      type="submit"
      value="수정"
    />
    <DelBtn onClick={onClickDelBtn}>삭제</DelBtn>
  </Container>);
}

export default StudentInfoItem;