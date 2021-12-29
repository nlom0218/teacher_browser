import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { outPopup } from '../../apollo';
import useMe from '../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from './StudentList';
import PopupContainer from '../Shared/PopupContainer';
import styled from 'styled-components';
import PopupCreateOneStudent from './PopupCreateOneStudent';
import PopupCreateManyStudent from './PopupCreateManyStudent';

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

const CreationType = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  padding: 10px 0px;
  padding: 0.625rem 0px;
  .creationTypeBtn {
    cursor: pointer;
    padding: 16px 40px;
    padding: 1rem 2.5rem;
    border: 1px solid ${props => props.theme.fontColor};
    :hover {
      background-color: ${props => props.theme.fontColor};
      color: ${props => props.theme.bgColor};
      transition: background-color 0.6s ease, color 0.6s ease;
    }
  }
`

const OneTypeBtn = styled.div`
  background-color: ${props => props.creationType === "one" && props.theme.fontColor};
  color: ${props => props.creationType === "one" && props.theme.bgColor};
`

const ManyTypeBtn = styled.div`
  background-color: ${props => props.creationType === "many" && props.theme.fontColor};
  color: ${props => props.creationType === "many" && props.theme.bgColor};
`

const PopupCreateStudent = () => {
  const [creationType, setCreationType] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const me = useMe()
  const onCompleted = (result) => {
    const { createStudent: { ok, error } } = result
    if (error) {
      setErrMsg(error)
      return
    }
    outPopup()
  }
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }]
  })
  const onClickCreationType = (type) => setCreationType(type)
  return (<PopupContainer>
    <CreationType>
      <OneTypeBtn className="creationTypeBtn" onClick={() => onClickCreationType("one")} creationType={creationType}>단일 생성</OneTypeBtn>
      <ManyTypeBtn className="creationTypeBtn" onClick={() => onClickCreationType("many")} creationType={creationType}>복수 생성</ManyTypeBtn>
    </CreationType>
    {creationType === "one" &&
      <PopupCreateOneStudent
        createStudent={createStudent}
        loading={loading}
        email={me?.email}
        errMsg={errMsg}
        setErrMsg={setErrMsg}
      />
    }
    {creationType === "many" && <PopupCreateManyStudent />}
  </PopupContainer>);
}

export default PopupCreateStudent;