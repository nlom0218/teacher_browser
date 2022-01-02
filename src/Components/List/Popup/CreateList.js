import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import useMe from '../../../Hooks/useMe';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../AllList';

const CREATE_STUDENT_LIST_MUTATION = gql`
  mutation CreateStudentList($teacherEmail: String!, $listName: String!) {
    createStudentList(teacherEmail: $teacherEmail, listName: $listName) {
      ok
      error
    }
  }
`

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
    column-gap: 40px;
    column-gap: 2.5rem;
  `}
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

const SubmitInput = styled.input`
  text-align: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.6s ease;
`

const CreateList = () => {
  const me = useMe()
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { createStudentList: { ok, error } } = result
    if (!ok) {
      window.alert(error)
      return
    }
    outPopup()
  }
  const [createStudentList, { loading }] = useMutation(CREATE_STUDENT_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_LIST_QUERY }]
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { listName, listOrder } = data
    createStudentList({
      variables: {
        teacherEmail: me?.email,
        listName,
      }
    })
  }
  return (<PopupContainer>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <NameInput
        {...register("listName", {
          required: true,
          minLength: 3,
          maxLength: 10
        })}
        type="text"
        autoComplete="off"
        placeholder="리스트 이름을 입력하세요."
        maxLength="10"
      />
      <SubmitInput
        type="submit"
        disabled={!isValid}
        value="생성"
      />
    </Form>
  </PopupContainer>);
}

export default CreateList;