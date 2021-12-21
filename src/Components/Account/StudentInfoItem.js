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

const EDIT_STUDENT_MUTATION = gql`
    mutation DeleteStudent($id: String!, $name: String!, $teacherEmail: String!) {
    editStudent(id: $id, name: $name, teacherEmail: $teacherEmail) {
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
    grid-template-columns: 1fr 7fr auto auto;
  `}
`

const StudentOrder = styled.div`
  grid-column: 1 / -1;
  font-weight: 600;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2
  `}
`

const Input = styled.input`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
   grid-column: 2 / 3
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


const ErrMsg = styled.div`
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
  grid-column: 1 / -1;
`

const StudentInfoItem = ({ name, userEmail, id, order }) => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, setValue, handleSubmit } = useForm({
    mode: "onChange",
  })

  const [deleteStudent, { delLoading }] = useMutation(DELETE_STUDENT_MUTATION, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }, { query: ME_QUERY }]
  })
  const onCompleted = (result) => {
    const { editStudent: { ok, error } } = result
    if (ok) {
      window.alert("학생 이름이 수정되었습니다.")
    } else {
      setErrMsg(error)
    }
  }

  const [editStudent, { editLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }],
    onCompleted
  })
  const onClickDelBtn = () => {
    if (delLoading) {
      return
    }
    if (window.confirm("해당 학생을 삭제하시겠습니까?")) {
      deleteStudent({
        variables: {
          teacherEmail: userEmail,
          name
        }
      })
    } else {
      return
    }
  }
  const onSubmit = (data) => {
    if (editLoading) {
      return
    }
    const { name: NewName } = data
    if (name === NewName) {
      return
    }
    editStudent({
      variables: {
        id,
        teacherEmail: userEmail,
        name: NewName
      }
    })
  }
  const onChangeInput = () => setErrMsg(undefined)

  useEffect(() => {
    setValue("name", name)
  }, [name])
  return (<Container onSubmit={handleSubmit(onSubmit)}>
    <StudentOrder>{order}번</StudentOrder>
    <Input
      {...register("name", {
        required: true,
        onChange: onChangeInput
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
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
  </Container>);
}

export default StudentInfoItem;