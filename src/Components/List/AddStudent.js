import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { outPopup } from '../../apollo';
import useMe from '../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from './StudentList';
import PopupContainer from '../Shared/PopupContainer';

// createStudent로 복수, 단일 학생 생성하기로 mutation로 바꾸기, 이때 복수일때와 단일일때 전달하는 값을 다르게 한다.
// ex) type = "복수" / type="단일"
const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($teacherEmail: String!, $studentName: String!, $studentOrder: Int!) {
    addStudent(teacherEmail: $teacherEmail, studentName: $studentName, studentOrder: $studentOrder) {
      ok
      error
    }
  }
`

const AddStudent = () => {
  const me = useMe()
  const onCompleted = (result) => {
    outPopup()
  }
  const [addStudent, { loading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }]
  })
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { name, order } = data
    addStudent({
      variables: {
        teacherEmail: me.email,
        studentName: name,
        studentOrder: parseInt(order)
      }
    })
  }
  return (<PopupContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        autoComplete="off"
        placeholder="학생 이름"
      />
      <input
        {...register("order")}
        type="number"
        autoComplete="off"
        placeholder="학생번호"
      />
      <input
        type="submit"
      />
    </form>
  </PopupContainer>);
}

export default AddStudent;