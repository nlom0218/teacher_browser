import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { outPopup } from '../../apollo';
import useMe from '../../Hooks/useMe';
import PopupContainer from '../Shared/PopupContainer';
import { SEE_STUDENT_LIST_QUERY } from './AllList';

const CREATE_STUDENT_LIST_MUTATION = gql`
  mutation CreateStudentList($teacherEmail: String!, $listName: String!, $listOrder: Int!) {
    createStudentList(teacherEmail: $teacherEmail, listName: $listName, listOrder: $listOrder) {
      ok
      error
    }
  }
`

const CreateList = () => {
  const me = useMe()
  console.log(me);
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    outPopup()
  }
  const [createStudentList, { loading }] = useMutation(CREATE_STUDENT_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_STUDENT_LIST_QUERY }]
  })
  const onSubmit = (data) => {
    const { listName, listOrder } = data
    createStudentList({
      variables: {
        teacherEmail: me?.email,
        listName,
        listOrder: parseInt(listOrder)
      }
    })
  }
  return (<PopupContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("listName")}
        type="text"
        autoComplete="off"
        placeholder="리스트 이름"
      />
      <input
        {...register("listOrder")}
        type="number"
        autoComplete="off"
        placeholder="리스트 순서"
      />
      <input
        type="submit"
      />
    </form>
  </PopupContainer>);
}

export default CreateList;