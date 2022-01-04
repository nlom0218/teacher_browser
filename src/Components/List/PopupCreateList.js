import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { outPopup } from '../../apollo';
import useMe from '../../Hooks/useMe';
import PopupContainer from '../Shared/PopupContainer';
import { SEE_STUDENT_LIST_QUERY } from './AllList';

const CREATE_STUDENT_LIST_MUTATION = gql`
  mutation CreateStudentList($teacherEmail: String!, $listName: String!) {
    createStudentList(teacherEmail: $teacherEmail, listName: $listName) {
      ok
      error
    }
  }
`

const PopupCreateList = () => {
  const me = useMe()
  const { register, handleSubmit } = useForm({
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
    refetchQueries: [{ query: SEE_STUDENT_LIST_QUERY }]
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("listName")}
        type="text"
        autoComplete="off"
        placeholder="리스트 이름"
      />
      <input
        type="submit"
      />
    </form>
  </PopupContainer>);
}

export default PopupCreateList;