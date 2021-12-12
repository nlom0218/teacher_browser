import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import BtnContainer from './styled/BtnContainer';
import DelBtn from './styled/DelBtn';
import RegisterBtn from './styled/RegisterBtn';

const DELETE_ALL_STUDENT_MUTATION = gql`
  mutation CreateStudent($teacherEmail: String!) {
    deleteAllStudent(teacherEmail: $teacherEmail) {
      ok
      error
    }
  }
`

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const EditStudent = ({ studentNum, setRegisterPage, registerPage, userEmail }) => {
  const onClickRegisterBtn = () => {
    if (registerPage) {
      return
    }
    if (studentNum === 0) {
      setRegisterPage("student")
    } else {
      setRegisterPage("studentInfo")
    }
  }
  const [deleteAllStudent, { loading }] = useMutation(DELETE_ALL_STUDENT_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onClickDelBtn = () => {
    if (loading) {
      return
    }
    if (studentNum === 0) {
      return
    }
    if (window.confirm("등록된 학생정보를 모두 삭제하시겠습니까?")) {
      deleteAllStudent({
        variables: {
          teacherEmail: userEmail
        }
      })
    } else {
      return
    }
  }
  return (<Container>
    {studentNum ? `${studentNum}명의 학생이 등록되어 있습니다.` : "등록된 학생이 없습니다."}
    <BtnContainer>
      <RegisterBtn onClick={onClickRegisterBtn}>{studentNum === 0 ? "등록하기" : "상세정보"}</RegisterBtn>
      <DelBtn onClick={onClickDelBtn}>학생정보 삭제하기</DelBtn>
    </BtnContainer>
  </Container>);
}

export default EditStudent;