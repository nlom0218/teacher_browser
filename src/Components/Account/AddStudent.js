import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';
import { SEE_ALL_STUDENT_QUERY } from "./StudentInfo"

const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($teacherEmail: String!, $name: String!, $order: Int!) {
    addStudent(teacherEmail: $teacherEmail, name: $name, order: $order) {
      ok
      error
    }
  }
`

const Container = styled.form`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  input {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 3fr auto;
    column-gap: 20px;
    column-gap: 1.25rem;
  `}
  div {
    grid-column: 1 / -1;
    font-weight: 600;
  }
  .addInput {
    background-color: ${props => props.theme.contentBgColor};
    transition: background-color 1s ease;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
    }
  }
`

const OrderInput = styled.input`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
  -webkit-appearance: none;
  }
`

const NameInput = styled.input`
`

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  cursor: pointer;
`

const ErrMsg = styled.div`
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
  grid-column: 1 / -1;
`

const AddStudent = ({ userEmail }) => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { addStudent: { ok, error } } = result
    if (ok) {
      setValue("name", "")
      setValue("order", "")
    } else {
      setErrMsg(error)
    }
  }
  const [addStudent] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }, { query: ME_QUERY }]
  })
  const onSubmit = (data) => {
    const { name: NewName, order } = data
    addStudent({
      variables: {
        teacherEmail: userEmail,
        name: NewName,
        order: parseInt(order)
      }
    })
  }
  const onChangeInput = () => setErrMsg(undefined)
  return (<Container onSubmit={handleSubmit(onSubmit)}>
    <div>학생 추가하기</div>
    <OrderInput
      className="addInput"
      {...register("order", {
        required: true,
        onChange: onChangeInput
      })}
      placeholder="학생 번호를 입력"
      type="number"
      autoComplete="off"
    />
    <NameInput
      className="addInput"
      {...register("name", {
        required: true,
        onChange: onChangeInput
      })}
      placeholder="학생 이름을 입력"
      type="text"
      autoComplete="off"
    />
    <SubmitInput
      type="submit"
      value="추가"
    />
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
  </Container>);
}

export default AddStudent;