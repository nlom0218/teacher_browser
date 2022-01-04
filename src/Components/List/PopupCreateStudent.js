import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { outPopup } from '../../apollo';
import useMe from '../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from './StudentList';
import PopupContainer from '../Shared/PopupContainer';

// createStudent로 복수, 단일 학생 생성하기로 mutation로 바꾸기, 이때 복수일때와 단일일때 전달하는 값을 다르게 한다.
// ex) type = "복수" / type="단일"
const CREATE_STUDENT_MUTATION = gql`
    mutation CreateStudent($teacherEmail: String!, $studentString: String!) {
    createStudent(teacherEmail: $teacherEmail, studentString: $studentString) {
      ok
      error
    }
  }
`

const PopupCreateStudent = () => {
  const [gender, setGender] = useState(undefined)
  console.log(gender);
  const me = useMe()
  const onCompleted = (result) => {
    const { createStudent: { ok, error } } = result
    if (error) {
      alert(error)
      return
    }
    outPopup()
  }
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }]
  })
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { name } = data
    createStudent({
      variables: {
        teacherEmail: me?.email,
        studentString: JSON.stringify([{ name, gender }])
      }
    })
  }
  const onClickGender = (type) => setGender(type)
  return (<PopupContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        autoComplete="off"
        placeholder="학생 이름"
      />
      <div onClick={() => onClickGender("male")} gender={gender}>남자</div>
      <div onClick={() => onClickGender("female")} gender={gender}>여자</div>
      <input
        type="submit"
        disabled={!gender}
      />
    </form>
  </PopupContainer>);
}

export default PopupCreateStudent;